'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTestIdFromSession, isDebugMode, removeUserCookie } from '@/utils';
import { userAuthTokenSelector } from '@/store/features/userAuth/selectors';
import { setIsFullScreen } from '@/store/features/test';

export default function PreventBackNavigation() {

    const pathname = usePathname();
    const testId = getTestIdFromSession();
    const userAuthToken = useSelector(userAuthTokenSelector);


    const dispatch = useDispatch()


    useEffect(() => {

        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                dispatch(setIsFullScreen(false))
            }
        };

        // Add event listener for fullscreen change
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);




    useEffect(() => {
        if (!isDebugMode()) {

            if ((!pathname.includes("/admin") && pathname !== "/v1") && !userAuthToken) {
                window.location.replace(`/v1/?testId=${testId}`);
            }
            // Detect browser back navigation
            window.onpopstate = () => {

                if (!pathname.includes("admin")) {
                    removeUserCookie();
                    if (testId) {
                        window.location.replace(`/v1/?testId=${testId}`);
                    } else {
                        window.location.replace(`/v1`);
                    }
                }


            };
        }

    }, [pathname, testId]);

    return null;
}
