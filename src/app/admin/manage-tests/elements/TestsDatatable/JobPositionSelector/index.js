import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox } from '@mui/material';
import { jobPositionSelector } from '@/store/features/questions/selectors';
import { useSelector } from 'react-redux';

const JobPositionSelector = ({
    jobPositionValue,
    setJobPositionValue }) => {



    const jobPositions = useSelector(jobPositionSelector)

    let options = jobPositions?.map((item) => ({
        label: item,
        value: item
    }))

    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.label}
            value={jobPositionValue?.map(v => options.find(opt => opt.value == v) || { label: v, value: v, color: "#000000" })}
            onChange={(event, newValue) => setJobPositionValue(newValue.map(opt => opt.value))}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props} className="!p-0 cursor-pointer flex items-center">
                    <Checkbox checked={selected} style={{ marginRight: 8 }} size='small' />
                    <span className='py-2 whitespace-pre-wrap'>{option.label}</span>
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Job Position"
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
                            startAdornment: jobPositionValue.length > 0 ? `${jobPositionValue.length} selected` : "",
                        },
                    }}
                />
            )}
            sx={{
                minWidth: 150,
                width: '100%',
            }}
            classes={{
                paper: "!w-[280px]"
            }}
        />
    );
};

export default JobPositionSelector;
