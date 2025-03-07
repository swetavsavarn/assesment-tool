import { CONSTANTS } from '@/constants';
import { Autocomplete, TextField, Checkbox } from '@mui/material';
import React, { useState } from 'react';

const { TIME_PERIOD_VALUES } = CONSTANTS;

const TimePeriodSelector = ({
    timePeriodValue,
    setTimePeriodValue
}) => {


    const options = [
        { label: "Today", value: TIME_PERIOD_VALUES.TODAY },
        { label: "Yesterday", value: TIME_PERIOD_VALUES.YESTERDAY },
        { label: "Last 7 days", value: TIME_PERIOD_VALUES.LAST_7_DAYS },
        { label: "This month", value: TIME_PERIOD_VALUES.THIS_MONTH },
        { label: "Last month", value: TIME_PERIOD_VALUES.LAST_MONTH },
    ];

    return (
        <Autocomplete
            // multiple
            options={options}
            getOptionLabel={(option) => option?.label}
            value={timePeriodValue ? timePeriodValue : undefined}
            onChange={(event, newValue) => {
                setTimePeriodValue(newValue)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Values"
                    variant="outlined"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                            paddingLeft: '15px',
                            fontSize: '14px',
                        },
                    }}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            startAdornment: timePeriodValue?.length > 0
                                ? `${timePeriodValue?.length} selected`
                                : "",
                        },
                    }}
                />
            )}
            sx={{
                minWidth: 150,
                width: '100%',
            }}
        />
    );
};

export default TimePeriodSelector;
