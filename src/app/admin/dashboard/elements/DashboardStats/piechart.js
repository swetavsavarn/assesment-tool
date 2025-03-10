import { useState } from "react";
import { Card, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import Link from "next/link";
// const data = [
//     { name: "Assessments Sent", value: 38, color: "#41C1D0" ,link:"/admin/manage-tests"},
//     { name: "Completed Assessments", value: 30, color: "#4F79C7",link: "/admin/manage-tests",},
//     { name: "Open Assessments", value: 32, color: "#3A3E44",link: "/admin/manage-tests" },
// ];
function DashboardPiechart({data}) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <>
        {data &&
        <Card
            className="bg-[#22282E] p-4 rounded-2xl w-[400px] text-white shadow-lg"
            sx={{ backgroundColor: "#22282E", color: "white" }} // Ensure background color
        >
            <Typography variant="h4" fontWeight="bold" className="p-2  text-center">
                Country Distribution
            </Typography>
            {/* Pie Chart */}
            <div className="flex justify-center items-center relative">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
               
            </div>
            {/* Legend */}
            <div className="mt-4">
                {data.map((item, index) => {
                const isClickable = item?.value > 0;
                return(
                    <div key={index} className={`flex items-center mb-2 px-2 ${isClickable ? "cursor-pointer" : "cursor-default"}`}>
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        {isClickable ?<Link href={item.link}>{item.name}</Link>:<p>{item.name}</p>}
                       
                    </div>
                )})}
            </div>
        </Card>
}
        </>
    )
}

export default DashboardPiechart



