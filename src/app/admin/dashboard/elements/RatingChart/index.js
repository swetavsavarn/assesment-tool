import React from 'react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useSelector } from 'react-redux';
import { dashboardDataSelector } from '@/store/features/questions/selectors';
import dynamic from 'next/dynamic';

const RatingChart = () => {
    const dashboardData = useSelector(dashboardDataSelector);

    const staticData = [
        {
            positive: {
                total: 0,
                percent: "00.00",
            },
        },
        {
            negative: {
                total: 1,
                percent: "0",
            },
        },
        {
            neutral: {
                total: 0,
                percent: "0",
            },
        },
    ];

    // Reorder the data
    const orderedKeys = ["positive", "neutral", "negative"];

    // Use dynamic data with a fallback
    let chartData = dashboardData?.feedBackData?.ratingPercent || staticData;
    chartData = orderedKeys.map(key => chartData.find(item => item[key]));



    const series = [
        {
            name: 'Percentage',
            data: chartData.map((item) => parseFloat(Object.values(item)[0].percent)),
        },
    ];

    const options = {
        states: {
            active: {
                filter: {
                    type: 'none' /* none, lighten, darken */
                }
            }
        },
        chart: {
            type: 'bar',
            background: '#1A2533',
            toolbar: {
                show: false,
            },
        },
        grid: {
            show: true, // Disable horizontal grid lines
            borderColor: '#334155',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded',
                distributed: true
            },
        },
        dataLabels: {
            enabled: false,
            position: 'top', // Position the labels at the top of each bar
            offsetY: -10, // Adjust the Y offset to place it just above the bar
            style: {
                colors: ['#FFFFFF'],
                fontSize: '14px',
            },
            formatter: function (val) {
                if (val === 0) {
                    return ''; // Show '0%' for zero values
                }
                return `${val}%`;
            },
            background: {
                // enabled: true, // Optional: Adds background to data labels for visibility
                borderRadius: 3,
                padding: 4,
                opacity: 0.8,
            },
        },
        xaxis: {
            categories: ['Positive', 'Neutral', 'Negative'],
            labels: {
                style: {
                    colors: '#94A3B8',
                },
            },
            axisBorder: {
                color: "#334155"
            },
            axisTicks: {
                show: false
            }


        },
        yaxis: {
            max: 100,
            labels: {
                style: {
                    colors: '#94A3B8',
                },
                formatter: function (value) {
                    return Math.floor(value); // Remove decimal places by rounding down
                },
            },
        },
        fill: {
            colors: ['#16A34A', '#DE6B00', '#B91C1C'], // Assign different colors to each bar
        },
        tooltip: {
            theme: 'dark',
        },
        legend: {
            show: false,
        },
    };


    return (
        <div className="bg-[#1A2533]  rounded-lg shadow-lg p-5 flex flex-col justify-between gap-y-3 max-h-[225px] overflow-hidden">
            <h2 className="text-white text-center text-[18px] font-medium leading-[27px]">
                Rating Distribution
            </h2>
            <Chart options={options} series={series} type="bar" height={150} />
        </div>
    );
};

export default RatingChart;
