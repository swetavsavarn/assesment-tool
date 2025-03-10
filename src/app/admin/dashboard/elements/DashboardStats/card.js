import React from 'react'
import CountUp from "react-countup";
import ReactStars from "react-rating-stars-component";
import { Card, CardContent, Typography, Box } from "@mui/material";


function DashboardCard({ item }) {
    return (
        <>
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
                    <Typography variant="h4" fontWeight="bold" className="p-2  text-center">
                            {item.title}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        <p className={`text-[55px] font-bold mt-4 text-center ${item.color || "text-gray-200" }`}>
                            <CountUp
                                start={0}
                                end={parseFloat(item.value)} // Convert string to a number
                                duration={2.5}
                                separator=","
                                decimals={
                                    ["Assessment Completion Rate", "Performance Rating"].includes(item.title) &&
                                        !Number.isInteger(parseFloat(item.value)) // Check if the parsed value is not an integer
                                        ? 1
                                        : 0
                                }
                            />
                            {["Assessment Completion Rate"].includes(item.title) && "%"}
                            {["Performance Rating"].includes(item.title) && <ReactStars classNames="w-full flex justify-center" value={item?.value} readonly={true} isHalf={true} size={30} edit={false} activeColor={"#FFB800"} />}
                        </p>
                    </Typography>
                </Box>
            </Card>
        </>
    )
}

export default DashboardCard