import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const CustomSelect = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched,
  options = [],
  disabled,
}) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{ width: "100%" }}
      error={touched && Boolean(error)}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        fullWidth
        error={touched && Boolean(error)}
        disabled={disabled}
        MenuProps={{
          PaperProps: {},
          disableScrollLock: true, // Prevents scroll lock when dropdown is open
        }}
      >
        {options.map((option) => (
          <MenuItem
            value={option?.id || option?.skillId || option?.levelId}
            key={option?.id}
          >
            {option?.name ||
              option?.title ||
              option?.skillName ||
              option?.levelName}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
