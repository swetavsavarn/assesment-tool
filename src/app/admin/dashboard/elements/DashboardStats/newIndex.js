"use client";
import { dashboardDataSelector } from "@/store/features/questions/selectors";
import { calculateCompletionRate } from "@/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import RatingChart from "../RatingChart";
import CountUp from "react-countup";
import ReactStars from "react-rating-stars-component";
import { Card, CardContent, Typography, Box } from "@mui/material";

const NewDashBoard = () => {
    const dashboardData = useSelector(dashboardDataSelector);

    // Compute completion rate dynamically
    const completionRate = useMemo(() => {
        return calculateCompletionRate(dashboardData?.testCounts) || 0;
    }, [dashboardData]);

    // Function to determine the color based on the completion rate
    const getCompletionRateColor = (rate) => {
        if (rate >= 70) return "text-[#22C55E]"; // Green
        if (rate >= 50) return "text-orange-500"; // Orange
        return "text-red-500"; // Red
    };

    // Function to determine the color based on the completion rate
    const getRatingColor = (rate) => {
        if (rate >= 4) return "text-[#22C55E]"; // Green
        if (rate >= 3) return "text-orange-500"; // Orange
        return "text-red-500"; // Red
    };

    const stats = [
        {
            title: "Assessment Completion Rate",
            value: completionRate, // Use the dynamic value
            description: "Started vs completed tests",
            link: "/admin/manage-tests",
            color: getCompletionRateColor(completionRate), // Dynamically determine color
        },
        {
            title: "Ongoing Assessments",
            value: dashboardData.testCounts?.onGoing || 0,
            description: "Assessments in progress",
            link: "/admin/manage-tests",
        },
        {
            title: "Expired Assessments",
            value: dashboardData.testCounts?.expired || 0,
            description: "Assessments expired without attempt",
            link: "/admin/manage-tests",
        },
        {
            title: "Available Questions",
            value: dashboardData.totalQuestions || 0,
            description: "Questions available for tests",
            link: "/admin/manage-skills",
        },
        {
            title: "Assessments Sent",
            value: (dashboardData.testCounts?.sent || 0),
            description: "Total assessments sent to candidates",
            link: "/admin/manage-tests",
        },
        {
            title: "Completed Assessments",
            value: dashboardData.testCounts?.finished || 0,
            description: "Assessments completed",
            link: "/admin/manage-tests",
        },
        {
            title: "Open Assessments",
            value: (dashboardData.testCounts?.onGoing || 0) + (dashboardData.testCounts?.pending || 0),
            description: "Tests currently being taken",
            link: "/admin/manage-tests",
        },
        {
            title: "Assessment Feedback",
            value: dashboardData.feedBackData?.totalRecords || 0,
            description: "Feedbacks received",
            link: "/admin/feedback",
        },
        {
            title: "Performance Rating",
            value: parseFloat(dashboardData.feedBackData?.avgRating || 0).toFixed(2),
            description: "Average rating",
            link: "/admin/feedback",
            color: getRatingColor(dashboardData.feedBackData?.avgRating)
        },

    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 bg-newCodes-background">
            <RatingChart />
            {stats.map((stat, index) => {
                if (stat?.title == "Performance Rating") {
                    return (
                        <div
                            key={index}
                            className="bg-newCodes-foreground rounded-lg shadow-lg p-5 flex flex-col justify-between gap-y-0 max-h-[250px]"
                        >
                            <h2 className="text-white text-center text-[18px] font-medium leading-[27px]">
                                {stat.title}
                            </h2>
                            <p
                                className={`font-bold mt-0 text-center ${stat.color || "text-gray-200"
                                    }`}
                            >
                                <span className="text-[55px]">
                                    <CountUp
                                        start={0}
                                        end={parseFloat(stat.value)} // Convert string to a number
                                        duration={2.5}
                                        separator=","
                                        decimals={
                                            ["Assessment Completion Rate", "Performance Rating"].includes(stat.title) &&
                                                !Number.isInteger(parseFloat(stat.value)) // Check if the parsed value is not an integer
                                                ? 1
                                                : 0
                                        }
                                    />
                                </span>
                                {/* <div className="justify-center"> */}
                                <ReactStars classNames="w-full flex justify-center" value={stat?.value} readonly={true} isHalf={true} size={30} edit={false} activeColor={"#FFB800"} />
                                {/* </div> */}
                                {["Assessment Completion Rate"].includes(stat.title) && "%"}
                            </p>


                            {stat?.value > 0 ? <Link
                                className="text-[#93C5FD] underline font-medium text-[14px] text-lg  text-center"
                                href={stat.link}
                            >
                                {stat.description}
                            </Link> : <p
                                className="cursor-default text-white font-medium text-[14px] text-lg text-center"
                            >
                                {stat.description}
                            </p>}
                        </div>
                    )
                }

                return (
                    <>
                        {/* <div
                        key={index}
                        className="bg-newCodes-foreground rounded-lg shadow-lg p-5 flex flex-col justify-between gap-y-3 max-h-[250px]"
                    >
                        <h2 className="text-white text-center text-[18px] font-medium leading-[27px]">
                            {stat.title}
                        </h2>
                        <p
                            className={`text-[55px] font-bold mt-4 text-center ${stat.color || "text-gray-200"
                                }`}
                        >
                            <CountUp
                                start={0}
                                end={parseFloat(stat.value)} // Convert string to a number
                                duration={2.5}
                                separator=","
                                decimals={
                                    ["Assessment Completion Rate", "Performance Rating"].includes(stat.title) &&
                                        !Number.isInteger(parseFloat(stat.value)) // Check if the parsed value is not an integer
                                        ? 1
                                        : 0
                                }
                            />
                            {["Assessment Completion Rate"].includes(stat.title) && "%"}
                        </p>


                        {stat?.value > 0 ? <Link
                            className="text-[#93C5FD] hover:text-[#60A5FA] underline font-medium text-[14px] text-lg mt-2 text-center whitespace-nowrap"
                            href={stat.link}
                        >
                            {stat.description}
                        </Link> : <p
                            className="whitespace-nowrap cursor-default text-white font-medium text-[14px] text-lg mt-2 text-center"
                        >
                            {stat.description}
                        </p>}
                    </div> */}
                        <Card
                            sx={{
                                backgroundColor: "#22282E",
                                color: "white",
                                borderRadius: 2,
                                padding: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                minWidth: 250,
                            }}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    <h2 className="text-white text-center text-[18px] font-medium leading-[27px]">
                                        {stat.title}
                                    </h2>
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    <p
                                        className={`text-[55px] font-bold mt-4 text-center ${stat.color || "text-gray-200"
                                            }`}
                                    >
                                        <CountUp
                                            start={0}
                                            end={parseFloat(stat.value)} // Convert string to a number
                                            duration={2.5}
                                            separator=","
                                            decimals={
                                                ["Assessment Completion Rate", "Performance Rating"].includes(stat.title) &&
                                                    !Number.isInteger(parseFloat(stat.value)) // Check if the parsed value is not an integer
                                                    ? 1
                                                    : 0
                                            }
                                        />
                                        {["Assessment Completion Rate"].includes(stat.title) && "%"}
                                    </p>
                                </Typography>
                                <Typography variant="body2" color="lightgreen">
                                    {stat?.value > 0 ? <Link
                                        className="text-[#93C5FD] hover:text-[#60A5FA] underline font-medium text-[14px] text-lg mt-2 text-center whitespace-nowrap"
                                        href={stat.link}
                                    >
                                        {stat.description}
                                    </Link> : <p
                                        className="whitespace-nowrap cursor-default text-white font-medium text-[14px] text-lg mt-2 text-center"
                                    >
                                        {stat.description}
                                    </p>}
                                </Typography>
                            </Box>
                        </Card>
                    </>
                )
            })}
        </div>
    );
};

export default NewDashBoard;

