import { useState, useEffect } from 'react';

const useCountdown = (initialTime, onTimeOver) => {

    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeOver) onTimeOver(); // Call the callback function when time is over
            return; // Stop the countdown when it reaches 0
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [timeLeft, onTimeOver]); // Adding onTimeOver as a dependency to ensure the callback is updated

    return timeLeft;
};

export default useCountdown;
