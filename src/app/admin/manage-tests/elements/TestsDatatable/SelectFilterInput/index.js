import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectFilterInput = ({ onChange, selectedFilter }) => {

    const selectFilterOptions = ["Test Status", "Test Date"];

    return (
        <FormControl fullWidth size="small">
            <InputLabel>Select Filter</InputLabel>
            <Select
                value={selectedFilter}
                onChange={onChange}
                label="Select Filter"
            >
                {selectFilterOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectFilterInput