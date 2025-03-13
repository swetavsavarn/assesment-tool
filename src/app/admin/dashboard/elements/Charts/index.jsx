import React from "react";
import JobProfilePerformanceSkillsChart from "../JobProfilePerformanceSkillsChart";
import JobProfileChart from "../JobProfileChart";
import { useSelector } from "react-redux";
import { dashboardDataSelector } from "@/store/features/questions/selectors";

const Charts = () => {
    const dashboardData = useSelector(dashboardDataSelector);
    console.log("njdfkesf",dashboardData)

    return (
        <div className="grid lg:grid-cols-2 gap-x-6 mt-6">
            <JobProfileChart data={dashboardData?.jobProfileTestAverage} />
            <JobProfilePerformanceSkillsChart
                data={dashboardData?.jobPositionPerformanceBySkills}
            />
        </div>
    );
};

export default Charts;