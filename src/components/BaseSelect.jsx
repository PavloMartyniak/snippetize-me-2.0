import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText, Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";

export default function BaseSelect({
  data,
  label,
  disabled,
  tooltip,
  name,
  control,
  helperText,
  rules,
  error,
  item,
  setItem,
}) {
  return (
    <Tooltip title={disabled && tooltip}>
      <Box sx={{ minWidth: 130 }}>
        <FormControl fullWidth error={error}>
          <InputLabel>{label}</InputLabel>
          <Controller
            name={name}
            control={control}
            rules={rules}
            disabled={disabled}
            render={({ field }) => (
              <Select label={label} {...field}>
                {data?.map((item) => (
                  <MenuItem
                    onClick={() => setItem(item)}
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </Box>
    </Tooltip>
  );
}
