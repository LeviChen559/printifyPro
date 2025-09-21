import { FC } from "react";
import {TextField,FormHelperText,Box} from "@mui/material";
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
  background?:string;
  helperText?: string;
  disabled?: boolean;
}

const FormPropsTextFields: FC<iProps> = (prop) => {
  return (
    <Box sx={{width:"100%"}}>
    <TextField
      disabled={prop.disabled? true : false}
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
          background:prop.background,
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
      onClick={prop.onClick}
      onChange={prop.onChange}
      placeholder={prop.placeholder}
    />
    {prop.error && <FormHelperText sx={{padding:0,margin:0,color:"red"}}>{prop.helperText}</FormHelperText>}
</Box>
  );
};

export default FormPropsTextFields;
