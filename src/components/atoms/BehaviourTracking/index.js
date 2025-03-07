"use client";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import useSnackbar from "@/hooks/useSnakbar";
import { useAddBehaviourWarningMutation } from "@/services/api-service/admin/questions";
import { updateBehaviorWarning } from "@/store/features/test";
import { useDispatch, useSelector } from "react-redux";
import { testIdSelector, testSelector } from "@/store/features/test/selectors";

const BehaviourTracking = ({ videoStreamTracking }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const dispatch = useDispatch()

  const { showError, showSuccess } = useSnackbar();
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [detectionRunning, setDetectionRunning] = useState(false);

  // State for tracking behavior
  const [lookAwayCount, setLookAwayCount] = useState(0);
  const [lookAwayStart, setLookAwayStart] = useState(null);
  const [multiFaceDetected, setMultiFaceDetected] = useState(false);
  const [warnings, setWarnings] = useState(0); // Single warning counter

  const [addBehaviourWarning] = useAddBehaviourWarningMutation()

  const testId = useSelector(testIdSelector)


  const test = useSelector(testSelector)
  console.log(test?.testInfo.behaviorWarning, "behaviorWarning>>>");


  const handleAddBehaviourWarning = (warnings) => {
    console.log("ADDING BEHAVIOUR WARNING...");

    dispatch(updateBehaviorWarning(warnings))
    addBehaviourWarning({
      testId,
      behaviorWarning: warnings,
    }).unwrap().then(() => {

    }).catch((err) => {
      console.log(err, "ERROR");

    })
  }

  useEffect(() => {
    handleAddBehaviourWarning(warnings)
    console.log(warnings, "warnings>>>>");

  }, [warnings])


  const LOOK_AWAY_THRESHOLD = 1000; // 1 seconds in milliseconds
  const ALERT_THRESHOLD = 1; // 1 look-away events
  const DEBOUNCE_TIME = 1000; // 1 second debounce time

  useEffect(() => {
    initializeFaceLandmarker();
  }, []);

  useEffect(() => {
    if (faceLandmarker && videoStreamTracking)
      startDetection(videoStreamTracking);
  }, [faceLandmarker, videoStreamTracking]);

  const initializeFaceLandmarker = async () => {
    try {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "/models/wasm"
      );
      const faceLandmarkerInstance = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath: "/models/face_landmarker.task",
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 4,
        }
      );
      setFaceLandmarker(faceLandmarkerInstance);

      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        setCtx(context);
      }
    } catch (error) {
      console.error("Error initializing FaceLandmarker:", error);
    }
  };

  const startDetection = () => {
    if (videoStreamTracking) {
      try {
        console.log("Video Stream in detection ----->", videoStreamTracking);

        videoRef.current.muted = true; // Set muted first
        videoRef.current.srcObject = videoStreamTracking;

        videoRef.current.addEventListener("loadeddata", async () => {
          try {
            await videoRef.current.play();
            setDetectionRunning(true);
            detect();
          } catch (playError) {
            console.error("Error playing video:", playError);
          }
        });
      } catch (err) {
        console.error("Error detecting video stream :", err);
      }
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const updateWarning = debounce(() => {
    setWarnings((prev) => {
      const updatedWarnings = prev + 1;
      console.log("Updated Warnings--->", updatedWarnings);
      return updatedWarnings;
    });
  }, DEBOUNCE_TIME);

  const drawLandmarks = (landmarks, ctx, color) => {
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    landmarks.forEach((landmark) => {
      const x = landmark.x * canvasRef.current.width;
      const y = landmark.y * canvasRef.current.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const detect = async (video) => {
    if (!faceLandmarker || !ctx || !videoRef.current || !detectionRunning)
      return;

    const results = faceLandmarker.detectForVideo(
      videoRef.current,
      performance.now()
    );
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      if (results.faceLandmarks.length > 1) {
        setMultiFaceDetected(true);
        updateWarning();
        showError(
          "Multiple faces detected! Ensure only one person is visible."
        );
      } else {
        setMultiFaceDetected(false);
      }

      results.faceLandmarks.forEach((landmarks) => {
        drawLandmarks(landmarks, ctx, "#ffffff");

        // Eye tracking: Check for look-away behavior
        const leftEye = landmarks[33]; // Left eye landmark
        const rightEye = landmarks[263]; // Right eye landmark
        const nose = landmarks[1]; // Nose landmark for reference

        if (nose && leftEye && rightEye) {
          if (isLookingAway(nose)) {
            handleLookAway();
          } else if (isEyesLookingAway(nose, leftEye, rightEye)) {
            updateWarning();
            showError("Keep your eyes on the screen at all times.");
          } else {
            resetLookAway();
          }
        }
      });
    } else {
      updateWarning();
      showError("Face not detected. Please stay in view.");
    }

    requestAnimationFrame(() => detect(video));
  };

  const isLookingAway = (nose) => {
    const noseX = nose.x * canvasRef.current.width;
    const noseY = nose.y * canvasRef.current.height;

    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    const offsetX = Math.abs(noseX - centerX);
    const offsetY = Math.abs(noseY - centerY);

    const thresholdX = canvasRef.current.width * 0.2;
    const thresholdY = canvasRef.current.height * 0.2;

    return offsetX > thresholdX || offsetY > thresholdY;
  };

  const isEyesLookingAway = (nose, leftEye, rightEye) => {
    const noseX = nose.x;
    const leftEyeX = leftEye.x;
    const rightEyeX = rightEye.x;

    const eyeCenterX = (leftEyeX + rightEyeX) / 2;

    const threshold = 0.05; // Small threshold for eye movement away from nose

    return Math.abs(eyeCenterX - noseX) > threshold;
  };

  const handleLookAway = () => {
    if (!lookAwayStart) setLookAwayStart(performance.now());

    const elapsedTime = performance.now() - lookAwayStart;
    if (elapsedTime > LOOK_AWAY_THRESHOLD) {
      setLookAwayCount((prev) => prev + 1);
      setLookAwayStart(null);
    }

    if (lookAwayCount >= ALERT_THRESHOLD) {
      updateWarning();
      showError("Avoid looking away too often.");
      setLookAwayCount(0); // Reset the count after the alert
    }
  };

  const resetLookAway = () => {
    setLookAwayStart(null);
  };

  useEffect(() => {
    if (detectionRunning) detect();
  }, [detectionRunning]);

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center h-screen bg-[#DDDDDD] cursor-default"
      style={{ display: "none" }}
    >
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-xl md:text-2xl text-white tracking-wider mb-10">
          Face Landmarker
        </h1>
        <div className="relative inline-block">
          <video
            ref={videoRef}
            id="webcam"
            style={{
              display: "none",
              width: "100%",
              height: "auto",
              position: "relative",
              zIndex: 5,
            }}
            autoPlay
            playsInline
          ></video>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              pointerEvents: "none",
              width: "100%",
              height: "100%",
            }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

BehaviourTracking.propTypes = {
  videoStreamTracking: PropTypes.object,
};

export default BehaviourTracking;
