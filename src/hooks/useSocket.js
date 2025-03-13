"use client"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from 'react';
import { userAuthTokenSelector } from '@/store/features/userAuth/selectors';
import { setIsConnectionLost, setSocket } from '@/store/features/socket';
import { socketSelector } from '@/store/features/socket/selectors';
import { SOCKET_EVENTS } from '@/lib/socket/events';
import { testIdSelector, testSelector } from '@/store/features/test/selectors';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket/socket';
import { exitFullscreen, getTestIdFromSession, refreshPage, stopStreams } from '@/utils';
import { setScreenStream, setStartRecording, setVideoStream } from '@/store/features/permissions';
import { permissionsSelector } from '@/store/features/permissions/selectors';
import useSnackbar from "./useSnakbar";


const useSocket = () => {

    const dispatch = useDispatch();
    const authToken = useSelector(userAuthTokenSelector);
    const socket = useSelector(socketSelector)
    const testId = useSelector(testIdSelector);
    const test = useSelector(testSelector);

    const { showSuccess, showError } = useSnackbar()

    const { screenStream, videoStream } = useSelector(permissionsSelector)

    const router = useRouter()

    const reconnectTimeout = useRef(null);

    useEffect(() => {
        if (authToken) {
            const socket = getSocket(authToken);
            dispatch(setSocket(socket));

            socket.on("connect", () => {
                console.info("Socket connected");
                dispatch(setIsConnectionLost(false))

                // ✅ Clear timeout when connected successfully
                if (reconnectTimeout.current) {
                    clearTimeout(reconnectTimeout.current);
                    reconnectTimeout.current = null;
                }
            });

            socket.on("disconnect", (reason) => {
                console.warn(`Socket disconnected: ${reason}`);

                if (reason === "transport close") {
                    dispatch(setIsConnectionLost(true))
                    console.warn("Network issue detected. Attempting to reconnect...");

                    // ✅ Start a 10-second timer to refresh if not reconnected
                    reconnectTimeout.current = setTimeout(() => {
                        console.warn("Reconnection failed. Refreshing page...");
                        refreshPage(getTestIdFromSession());
                        showError("No internet connection. Please check your network and try again.");
                    }, 20000);
                }
            });
        }

        return () => {
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current); // ✅ Clear timeout on unmount

            }
            socket?.off("connect");
            socket?.off("disconnect");
            socket?.off("event_response");
        };
    }, [authToken, dispatch]);

    useEffect(() => {


        socket?.on('event_response', (payload) => {
            const { eventName, data } = payload;
            if (eventName === SOCKET_EVENTS.FINISH_TEST && data?.testCode === testId) {
                dispatch(setStartRecording(false));
                stopStreams([screenStream, videoStream]);
                dispatch(setVideoStream(null))
                dispatch(setScreenStream(null))
                exitFullscreen();

                console.log(test.testInfo?.warning, "test.testInfo?.warning")
                if (test.testInfo?.warning >= 2) {
                    router.push("/v1/test-window/disqualified")
                } else {
                    router.push('/v1/test-result-feedback');
                }
            }
        });

        return () => {
            socket?.off('event_response')
        }


    }, [screenStream, videoStream, testId, test.testInfo?.warning])



    // Function to fire an event and handle acknowledgment
    const fireEvent = ({ eventName, data, callback }) => {
        if (!authToken) return; // Prevent firing if there's no auth token

        if (socket) {
            // Emitting event with acknowledgment
            socket.emit("event", { eventName, payload: data }, (response) => {
                callback?.(response)
                // Handle the acknowledgment response here
                // For example, update Redux store, trigger actions, etc.
            });
        }
    };


    return { fireEvent };
};

export default useSocket;