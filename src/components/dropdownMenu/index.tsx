import React, { FC } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
type DropdownType =
  | "weight_unit"
  | "logo"
  | "labelSize"
  | "case_unit"
  | "storage";

export enum CaseUnitType {
  "tray" = "tray",
  "bag" = "bag",
  "container" = "container",
  "piece" = "piece",
  "bottle" = "bottle",
}
export enum WeightUnitType {
  "g/tray" = "g/tray",
  "g/bag" = "g/bag",
  "pcs/tray" = "pcs/tray",
  "container" = "container",
  "g/piece" = "g/piece",
  "ml/bottle" = "ml/bottle",
}
export enum StorageType {
  "Freezer" = "Freezer",
  "Cooler" = "Cooler",
  "Freezer/Cooler" = "Freezer/Cooler",
  "Normal" = "Normal",
}

const DROPDOWN_OPTIONS = {
  weight_unit: Object.values(WeightUnitType),
  case_unit: Object.values(CaseUnitType),
  storage: Object.values(StorageType),
  logo: ["hons", "sunningfoods", "shinsenna", "viethuong"],
  labelSize: ["4x4_a", "4x4_b", "4x6_a"],
} as const;

interface iProps {
  type: DropdownType;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  width?: number|string;
  isOnLabelCard?: boolean;
  onEditMode?: () => void;
}
const DropdownMenu: FC<iProps> = (prop) => {
  const handleChange = (event: SelectChangeEvent) => {
    prop.onChange(event.target.value);
  };

  const formControlStyle = {
    background: "#ffffff80",
    height: prop.readOnly ? 24 : prop.isOnLabelCard ? 28 : 40,
    borderRadius: 1,
  };
  const MuiInputBaseStyle = {
    "&.MuiInputBase-root": {
      height: prop.readOnly ? 24 : prop.isOnLabelCard ? 28 : 40, // Adjusts the overall height of the component
      border: prop.readOnly ? "none" : "block", // Removes border
      padding: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: prop.readOnly ? "none" : "block", // Removes border around the dropdown
      padding: 0,
    },
    "& .MuiSelect-icon": {
      display: prop.readOnly ? "none" : "block", // Hides the dropdown icon
    },
    "& .MuiSelect-select": {
      padding: prop.readOnly ? "0px 0px 6px 0px !important" : "auto", // Ensures no padding within the select content
    },
  };
  return (
    <Box sx={{ width: prop.width, padding: "0" }}>
      <FormControl fullWidth size="small" sx={formControlStyle}>
        <Select
          labelId={`${prop.type}-select-label`}
          id={`${prop.type}-select`}
          value={prop.value}
          readOnly={prop.readOnly}
          onChange={handleChange}
          error={prop.error}
          sx={MuiInputBaseStyle}
          onClick={prop.onEditMode}
        >
          {DROPDOWN_OPTIONS[prop.type].map((item: string) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        {prop.helperText && (
          <FormHelperText sx={{ color: "red", textWrap: "nowrap" }}>
            {prop.helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default DropdownMenu;
