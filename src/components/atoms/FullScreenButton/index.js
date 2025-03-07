"use client"
import React, { useState } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useDispatch, useSelector } from "react-redux";
import { testSelector } from "@/store/features/test/selectors";
import { enterFullScreen, exitFullscreen } from "@/utils";
import { setIsFullScreen } from "@/store/features/test";

const FullScreenButton = () => {

    const dispatch = useDispatch()

    const { isFullScreen } = useSelector(testSelector)

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            enterFullScreen()
            dispatch(setIsFullScreen(true))
        } else {
            exitFullscreen()
            dispatch(setIsFullScreen(false))
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <button
            className="p-2 hover:bg-primary-400 rounded-full"
            onClick={toggleFullScreen}
        >
            {!isFullScreen ? (
                <FullscreenIcon />
            ) : (
                <FullscreenExitIcon />
            )}
        </button>
    );
};

export default FullScreenButton;
