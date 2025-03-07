"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


const CompletionRating = () => {
    const options = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '70%' },
                dataLabels: {
                    name: { show: false },
                    value: { fontSize: '22px', color: '#16A34A' },
                },
            },
        },
        labels: ['Completion'],
    };

    const series = [75]; // Completion percentage

    return (
        <div className="bg-[#1E293B] rounded-lg shadow-lg p-5 flex flex-col justify-between gap-y-3">
            <h2 className="text-white text-left text-[18px] font-medium leading-[27px]">
                Test Completion Rate
            </h2>
            <ReactApexChart options={options} series={series} type="radialBar" />
        </div>
    );
};

export default CompletionRating;
