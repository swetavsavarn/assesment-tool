import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'

const FilterOperator = () => {
    const options = ["Is", "Is not"];

    return (
        <FormControl sx={{ minWidth: 150 }} size="small" fullWidth>
            <Select value={options[0]} disabled>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default FilterOperator