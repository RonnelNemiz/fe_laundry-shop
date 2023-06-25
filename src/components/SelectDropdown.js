import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";

export default function SelectDropdown(props) {
  const { options, categories, sx, customError, name, label, errors, ...rest } =
    props;

  let error = false;
  let helperText = "";

  if (customError) {
    error = true;
    helperText = customError;
  }

  if (errors) {
    error = (errors && errors.has(name)) || false;
    helperText = (errors && errors.first(name)) || "";
  }

  const fieldProps = {
    error,
    name,
    helperText,
    sx,
    ...rest,
    value: rest.value || "",
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select label={label} size="small" {...fieldProps}>
          {options?.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
          {categories?.map((category, i) => (
            <MenuItem key={i} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
