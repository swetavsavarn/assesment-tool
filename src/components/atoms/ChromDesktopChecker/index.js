"use client"
import React, { useEffect, useState } from 'react';

const ChromeDesktopChecker = ({ children, fallback }) => {
    const [isChromeDesktop, setIsChromeDesktop] = useState(false);

    useEffect(() => {
        const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR|Brave/.test(navigator.userAgent);
        const isDesktop = !/Mobi|Android|Tablet|iPad|iPhone/.test(navigator.userAgent);

        if (isChrome && isDesktop) {
            setIsChromeDesktop(true);
        } else {
            setIsChromeDesktop(false);
        }
    }, []);

    if (isChromeDesktop) {
        return <>{children}</>;
    }

    return fallback || <div>Sorry, this website is only accessible on Chrome browser on desktop devices.</div>;
};

export default ChromeDesktopChecker;
