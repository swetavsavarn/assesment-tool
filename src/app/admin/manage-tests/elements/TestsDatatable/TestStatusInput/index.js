import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox } from '@mui/material';

const TestStatusInput = ({ statusInput, setStatusInput }) => {

    const options = [
        { label: "Expired", value: "expired", color: "#DC2626" }, // Custom red color from sx
        { label: "Disqualified", value: "disQualified", color: "#F97316" }, // Custom amber color from sx
        { label: "Completed", value: "finished", color: "#16A34A" }, // Custom green color from sx
        { label: "Pending", value: "pending", color: "#64748B" }, // Custom grey-blue color from sx
        { label: "Pass", value: "pass", color: "#4CAF50" }, // Light Green
        { label: "Fail", value: "fail", color: "#DC3545" }, // Red
        { label: "Ongoing", value: "onGoing", color: "#0284C7" }, // Custom blue color from sx
    ]
        ;

    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.label}
            value={statusInput.map(v => options.find(opt => opt.value === v) || { label: v, value: v, color: "#000000" })}
            onChange={(event, newValue) => setStatusInput(newValue.map(opt => opt.value))}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props} className="!p-0 cursor-pointer flex items-center">
                    <Checkbox checked={selected} style={{ marginRight: 8 }} size='small' />
                    <span className='h-4 w-4 ml-[-5px] inline-flex mr-3' style={{ background: option.color }}></span><span >{option.label}</span>
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Status"
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
                            startAdornment: statusInput.length > 0 ? `${statusInput.length} selected` : "",
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

export default TestStatusInput;
