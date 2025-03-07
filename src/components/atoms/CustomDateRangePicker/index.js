import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { TextField, IconButton } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const CustomDateRangePicker = () => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleDateChange = (item) => {
        setDateRange([item.selection]);
    };

    const formatDate = (date) =>
        date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div className="">
                {/* Date Range Input */}
                <div className="relative">
                    <div className="">
                        <TextField
                            variant="outlined"
                            size="small"
                            value={`${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate)}`}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: <IconButton onClick={handleToggle}>
                                        <CalendarTodayOutlinedIcon />
                                    </IconButton>
                                }
                            }}
                            className="w-full"
                        />
                    </div>
                    {Boolean(anchorEl) &&
                        <div className="absolute right-[30px] top-[45px] z-20"><DateRangePicker
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={dateRange}
                            direction="horizontal"
                        /></div>}
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default CustomDateRangePicker;
