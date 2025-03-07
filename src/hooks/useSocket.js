"use client"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { userAuthTokenSelector } from '@/store/features/userAuth/selectors';
import { setSocket } from '@/store/features/socket';
import { socketSelector } from '@/store/features/socket/selectors';
import { SOCKET_EVENTS } from '@/lib/socket/events';
import { testIdSelector, testSelector } from '@/store/features/test/selectors';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket/socket';
import { exitFullscreen, getTestIdFromSession, refreshPage, stopStreams } from '@/utils';
import { setScreenStream, setStartRecording, setVideoStream } from '@/store/features/permissions';
import { permissionsSelector } from '@/store/features/permissions/selectors';


const useSocket = () => {

    const dispatch = useDispatch();
    const authToken = useSelector(userAuthTokenSelector);
    const socket = useSelector(socketSelector)
    const testId = useSelector(testIdSelector);
    const test = useSelector(testSelector);

    const { screenStream, videoStream } = useSelector(permissionsSelector)



    const router = useRouter()

    useEffect(() => {

        if (authToken) {
            const socket = getSocket(authToken);

            dispatch(setSocket(socket))
            socket.on("connect", () => {
                console.info("Socket connected");
            });

            socket.on("disconnect", () => {
                refreshPage(getTestIdFromSession())
            });
        }

        return () => {
            if (socket) {
                socket?.off("connect");
                socket?.off("disconnect");
                socket?.off("event_response");
            }

        };
    }, [authToken]);

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
