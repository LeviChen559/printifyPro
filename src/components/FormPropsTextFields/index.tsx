import { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
interface iProps {
  id: string;
  label: string;
  value: string;
  startIcon: React.ReactNode;
  endIcon?: React.ReactNode;
  required: boolean;
  placeholder: string;
  type: string;
  sx?: object;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  rows?: number; // Optional: for multi-line text fields
  readOnly?: boolean;
  autoComplete?: string;
}

const FormPropsTextFields: FC<iProps> = (prop) => {
  return (
    <TextField
      required={prop.required}
      id={prop.id}
      error={prop.error}
      label={prop.label}
      value={prop.value}
      rows={prop.rows}
      multiline={prop.rows ? true : false}
      autoComplete={prop.autoComplete}
      sx={{
        ...prop.sx,
        ".MuiInputBase-root": {
          height: "100%", // Or specific height value here
        },
      }}
      type={prop.type}
      slotProps={{
       
          input: {
          readOnly: prop.readOnly,
          startAdornment: (
            <InputAdornment position="start">{prop.startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={prop.onClick}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {prop.endIcon}
            </InputAdornment>
          ),
        },
      }}
      onChange={prop.onChange}
      placeholder={prop.placeholder}
    />
  );
};

export default FormPropsTextFields;
