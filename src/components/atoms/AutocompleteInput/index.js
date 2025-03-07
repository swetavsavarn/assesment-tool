import { Autocomplete, TextField, Checkbox } from '@mui/material';
import React from 'react';

const AutocompleteInput = ({
    options,
    value,
    onChange,
}) => {
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option}
            value={value}
            onChange={onChange}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props} className="!p-0 cursor-pointer">
                    <Checkbox
                        checked={selected}
                        style={{ marginRight: 8 }}
                    />
                    {option}
                </li>
            )}
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
                            startAdornment: value?.length > 0
                                ? `${value?.length} selected`
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

export default AutocompleteInput;
