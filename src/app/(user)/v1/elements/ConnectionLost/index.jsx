import React, { useEffect, useState } from "react";
import {
    SignalWifi1Bar,
    SignalWifi2Bar,
    SignalWifi3Bar,
    SignalWifiOff,
} from "@mui/icons-material";

export const ConnectionLost = () => {
    const [dots, setDots] = useState("");
    const [progress, setProgress] = useState(0);
    const [signalStrength, setSignalStrength] = useState(0);

    useEffect(() => {
        // Cycle through dots for reconnecting animation
        const dotsInterval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        // Progress bar animation over 20 seconds
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 0.5 : 0));
        }, 100);

        // Simulate signal strength change to represent reconnecting attempts
        const signalInterval = setInterval(() => {
            setSignalStrength((prev) => (prev < 3 ? prev + 1 : 0));
        }, 500);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(progressInterval);
            clearInterval(signalInterval);
        };
    }, []);

    const getSignalIcon = () => {
        switch (signalStrength) {
            case 1:
                return (
                    <SignalWifi1Bar className="!text-8xl text-white animate-wiggle" />
                );
            case 2:
                return (
                    <SignalWifi2Bar className="!text-8xl text-white animate-wiggle" />
                );
            case 3:
                return (
                    <SignalWifi3Bar className="!text-8xl text-white animate-wiggle" />
                );
            default:
                return (
                    <SignalWifiOff className="!text-8xl text-red-400 animate-wiggle" />
                );
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50 animate-fade-in">
            <div className="text-center p-8 rounded-3xl shadow-2xl max-w-md relative bg-gray-800">
                {/* Wi-Fi Icon */}
                <div className="flex items-center justify-center mb-6">
                    {getSignalIcon()}
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold tracking-wide text-red-600">
                    Connection Lost
                </h2>

                {/* Message */}
                <p className="mt-3 text-md text-gray-300 leading-relaxed">
                    Your internet connection seems to be disconnected. Please check your
                    Wi-Fi or cable connection.
                </p>

                {/* Attempting to Reconnect */}
                <div className="mt-6">
                    <p className="text-sm text-gray-400">
                        Attempting to reconnect<span>{dots}</span>
                    </p>
                    <div className="w-full h-2 mt-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-400 rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-3deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 1.5s infinite;
        }
      `}</style>
        </div>
    );
};