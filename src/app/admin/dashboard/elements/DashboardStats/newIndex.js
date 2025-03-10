"use client";
import { dashboardDataSelector } from "@/store/features/questions/selectors";
import { calculateCompletionRate } from "@/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import RatingChart from "../RatingChart";
import CountUp from "react-countup";
import ReactStars from "react-rating-stars-component";
import DashboardCard from "./card";
import DashboardPiechart from "./piechart";


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
    ];
    const piechartData = [
        { name: "Assessments Sent", value: 38, color: "#41C1D0", link: "/admin/manage-tests" },
        { name: "Completed Assessments", value: 30, color: "#4F79C7", link: "/admin/manage-tests", },
        { name: "Open Assessments", value: 32, color: "#3A3E44", link: "/admin/manage-tests" },
    ]
    const assessmentRating=[
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
    ]
    return (
        <div className="grid grid-cols-1 gap-6 bg-newCodes-background">
    {/* First row: Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
            const isClickable = stat?.value > 0;
            return (
                <div key={index} className={isClickable ? "cursor-pointer" : "cursor-default"}>
                    {isClickable ? (
                        <Link href={stat.link}>
                            <DashboardCard item={stat} />
                        </Link>
                    ) : (
                        <DashboardCard item={stat} />
                    )}
                </div>
            );
        })}
    </div>

    {/* Second row: Piechart */}
    <div className="flex justify-center">
        <DashboardPiechart data={piechartData} />
    </div>

    {/* Third row: Assessment Rating */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {assessmentRating.map((stat, index) => {
            const isClickable = stat?.value > 0;
            return (
                <div key={index} className={isClickable ? "cursor-pointer" : "cursor-default"}>
                    {isClickable ? (
                        <Link href={stat.link}>
                            <DashboardCard item={stat} />
                        </Link>
                    ) : (
                        <DashboardCard item={stat} />
                    )}
                </div>
            );
        })}
    </div>
</div>
    );
};

export default NewDashBoard;

