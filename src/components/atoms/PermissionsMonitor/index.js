"use client"
import React, { useEffect, useRef, useState } from 'react'
import { SOCKET_EVENTS } from '@/lib/socket/events';
import { permissionsSelector } from '@/store/features/permissions/selectors';
import { isConnectionLostSelector, socketSelector } from '@/store/features/socket/selectors';
import { fireEventWithAck, isDebugMode } from '@/utils';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import BehaviourTracking from '../BehaviourTracking';

const PermissionsMonitor = () => {

    const socket = useSelector(socketSelector)
    const isConnectionLost = useSelector(isConnectionLostSelector)




    const { screenStream, videoStream, startRecording } = useSelector(permissionsSelector);
    const [trackingStream, setTrackingStream] = useState(null);

    const router = useRouter();

    const recordScreenAndUserVideo = async () => {
        try {
            // Validate the provided MediaStreams
            if (!(screenStream instanceof MediaStream) || !(videoStream instanceof MediaStream)) {
                console.info("One or both of the provided streams are not valid MediaStream.");
                return
            }

            // "Started combined screen and user video recording."

            // Setup canvas for video combination
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 1280;
            canvas.height = 720;

            const screenVideo = document.createElement("video");
            const userVideo = document.createElement("video");

            screenVideo.srcObject = screenStream;
            userVideo.srcObject = videoStream;

            // Mute the audio to prevent feedback
            screenVideo.muted = true;
            userVideo.muted = true;

            await screenVideo.play();
            await userVideo.play();

            const userVideoWidth = 320;
            const userVideoHeight = 180;

            // Capture video frames from canvas
            const combinedStream = canvas.captureStream(30); // Capture at 30 FPS

            // Merge audio tracks from screenStream and videoStream
            const audioTracks = [];
            if (screenStream.getAudioTracks().length > 0) {
                audioTracks.push(...screenStream.getAudioTracks());
            }
            if (videoStream.getAudioTracks().length > 0) {
                audioTracks.push(...videoStream.getAudioTracks());
            }

            const audioStream = new MediaStream(audioTracks);
            audioStream.getAudioTracks().forEach((track) => combinedStream.addTrack(track));

            // Setup recorder
            const recorder = new MediaRecorder(combinedStream, { mimeType: "video/mp4" });

            let videoBlob = [];

            // Function to draw video frames to the canvas
            const drawToCanvas = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height); // Full-screen video
                ctx.drawImage(
                    userVideo,
                    canvas.width - userVideoWidth,
                    canvas.height - userVideoHeight,
                    userVideoWidth,
                    userVideoHeight
                ); // Overlayed user video
                requestAnimationFrame(drawToCanvas); // Keep updating the canvas continuously
            };

            setTrackingStream(combinedStream);

            drawToCanvas(); // Start drawing

            // Handle recording chunks
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    // videoBlob.push(event.data);
                    if (!isDebugMode()) {
                        fireEventWithAck(socket, {
                            eventName: SOCKET_EVENTS.ADD_VIDEO_CHUNK,
                            payload: {
                                chunk: event.data
                            },
                        });
                    }

                }
            };

            // Handle stopping the recording and sending the final signal
            recorder.onstop = () => {
                // Stop all tracks in the streams
                screenStream.getTracks().forEach((track) => track.stop());
            };

            // Start recording
            recorder.start(5000); // Record in 5-second intervals

            // Stop recording when screen or camera sharing ends
            const stopRecording = () => {
                if (recorder.state !== "inactive") {
                    recorder.stop();
                }
            };

            screenStream.getVideoTracks()[0].onended = () => {
                router.push("/v1/proctoring-error");
                stopRecording();
            };

            videoStream.getVideoTracks()[0].onended = () => {
                router.push("/v1/proctoring-error");
                stopRecording();
            };

            return recorder;
        } catch (error) {
            console.error("Error recording screen and user video:", error);
            console.error("Failed to record screen and user video. Please check permissions and try again.");
        }
    };



    const recorderRef = useRef(null);


    useEffect(() => {

        const handleRecording = async () => {
            if (startRecording && socket) {
                recorderRef.current = await recordScreenAndUserVideo();
            } else {
                // Stop the recorder when startRecording changes to false
                if (recorderRef.current) {
                    recorderRef.current.stop();
                }
            }
        };

        handleRecording();
        // Cleanup on component unmount or if the recording stops
        return () => {
            if (recorderRef.current) {
                recorderRef.current.stop();
            }
        };
    }, [startRecording, socket]);

    console.log("Stream----->", videoStream);

    return (
        <>
            {/* {trackingStream && <BehaviourTracking videoStreamTracking={trackingStream} />} */}
            {/* Check if trackingStream is defined before rendering BehaviourTracking */}
            {videoStream && !isConnectionLost ? (
                <BehaviourTracking videoStreamTracking={videoStream} />
            ) : <></>}
        </>
    );
}

export default PermissionsMonitor;