import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const JobProfileChart = ({ data = [] }) => {
    console.log("data",data)

    const chartData = {
        series: [
            {
                name: 'Average Percentage',
                data: data.map((item) => parseFloat(item.averagePercentage)),
            },
        ],
        options: {
            states: {
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            chart: {
                type: 'bar',
                toolbar: {
                    show: false,
                },
            },
            grid: {
                show: true,
                borderColor: '#334155',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    dataLabels: {
                        position: 'top', // Position data labels at the top of the bars
                    },
                    columnWidth: '25px',
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => `${val}%`,
                offsetY: -18, // Adjust this value to fine-tune the vertical position of the labels
                style: {
                    fontSize: '12px',
                    colors: ['#94A3B8'],
                },
            },
            xaxis: {
                categories: data.map((item) => item.candidateJobPosition),
                labels: {
                    style: {
                        colors: '#94A3B8',
                        fontSize: '10px',
                    },
                    rotate: -45,

                },
                axisBorder: {
                    color: '#334155',
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                title: {
                    text: '%',
                },
                max: 100,
                labels: {
                    style: {
                        colors: '#94A3B8',
                    },
                    formatter: function (value) {
                        return Math.floor(value);
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val, { dataPointIndex }) => {
                        const fullName = data[dataPointIndex]?.candidateJobPosition;
                        return `${fullName}: ${val}%`;
                    },

                },
                theme: 'dark',
            },
            legend: {
                show: true,
                position: 'bottom',
                markers: {
                    width: 12,
                    height: 12,
                    radius: 12,
                },
                labels: {
                    colors: '#333',
                    useSeriesColors: false,
                },
            },
        },
    };

    return (
        <div className="col-span-2 rounded-lg p-4 bg-[#1E293B] mb-6  flex flex-col justify-between">
            <h2 className="text-white text-left text-[18px] font-medium leading-[27px]">
                Job Opening Performance vs. Benchmark
            </h2>
            <div>
                <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default JobProfileChart;