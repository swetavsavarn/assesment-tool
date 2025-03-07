"use client";
import { testSelector } from '@/store/features/test/selectors';
import { calculateTestExpirationTime } from '@/utils';
import React, { useMemo } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import TimerIcon from '@mui/icons-material/Timer'; // Import Timer icon from MUI

// 1738221822
// 50

const CountDownTime = () => {
    const test = useSelector(testSelector);

    // Use `useMemo` to calculate `date` only when relevant values change
    const expirationDate = useMemo(() => {
        return calculateTestExpirationTime(
            test?.testInfo?.testStartTime,
            test?.testInfo?.testTotalDuration
        );

    }, [test?.testInfo?.testStartTime, test?.testInfo?.testTotalDuration]);

    const renderer = ({ hours, minutes, seconds }) => {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        const isLessThanFiveMinutes = hours === 0 && minutes < 5;

        return (
            <div className='flex'>
                <div className="animate-bounce mr-1">
                    <TimerIcon />
                </div>
                <h1 style={{ color: isLessThanFiveMinutes ? 'red' : '' }}>
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}
                </h1>
            </div>
        );
    };


    // Ensure expirationDate is valid before rendering Countdown
    return expirationDate ? (

        <Countdown renderer={renderer} date={expirationDate} />
    ) : null;
};

export default CountDownTime;
