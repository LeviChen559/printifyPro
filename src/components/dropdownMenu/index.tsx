import React, { FC } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

interface iProps {
  type: string;
  logo?: string;
  setLogo?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  caseUnit?: string;
  setCaseUnit?: React.Dispatch<React.SetStateAction<string>>;
  labelSize?: string;
  setLabelSize?: React.Dispatch<React.SetStateAction<string>>;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  width?: string;
  isOnLabeCard?: boolean;
  onEditMode?: ()=>void;
}

const DropdownMenu: FC<iProps> = (prop) => {
  const handleWeightChange = (event: SelectChangeEvent) => {
    prop.setWeightUnit && prop.setWeightUnit(event.target.value as string);
  };
  const handleCaseChange = (event: SelectChangeEvent) => {
    prop.setCaseUnit && prop.setCaseUnit(event.target.value as string);
  };

  const handleLogoChange = (event: SelectChangeEvent) => {
    prop.setLogo && prop.setLogo(event.target.value as string);
  };
  const handleLabelSizeChange = (event: SelectChangeEvent) => {
    prop.setLabelSize && prop.setLabelSize(event.target.value as string);
  };
  const weightUnitList = [
    "g_tray",
    "g_bag",
    "pcs_tray",
    "container",
    "g_piece",
    "ml_bottle",
  ];


  const caseUnitList = ["tray", "bag", "container", "piece", "bottle"];
  const logoList = ["001", "002", "003", "004"];
  const labelTypeList = ["4x4_a","4x4_b","4x6_a"];
  const formControlStyle = {
    background: "#ffffff80",
    height: prop.readOnly?24:prop.isOnLabeCard ? 28 : 40,
    borderRadius: 1,
  };
  const MuiInputBaseStyle = {
    "&.MuiInputBase-root": {
      height: prop.readOnly?24:prop.isOnLabeCard ? 28 : 40, // Adjusts the overall height of the component
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
      {prop.type === "weight_unit" ? (
        <FormControl fullWidth size="small" sx={formControlStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.weightUnit}
            readOnly={prop.readOnly}
            onChange={handleWeightChange}
            error={prop.error}
            sx={MuiInputBaseStyle}
            onClick={prop.onEditMode}
          >
            {weightUnitList.map((item) => {
              return (
                <MenuItem value={item} key={item}  >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText sx={{ color: "red", textWrap: "nowrap" }}>
            {prop.helperText}
          </FormHelperText>
        </FormControl>
      ) : prop.type === "logo" ? (
        <FormControl fullWidth size="small" sx={formControlStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.logo}
            readOnly={prop.readOnly}
            onChange={handleLogoChange}
            sx={MuiInputBaseStyle}
          >
            {logoList.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText sx={{ color: "red", textWrap: "nowrap" }}>
            {prop.helperText}
          </FormHelperText>
        </FormControl>
       ) : prop.type === "labelSize" ? (
        <FormControl fullWidth size="small" sx={formControlStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.labelSize}
            readOnly={prop.readOnly}
            onChange={handleLabelSizeChange}
            sx={MuiInputBaseStyle}
          >
            {labelTypeList.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText sx={{ color: "red", textWrap: "nowrap" }}>
            {prop.helperText}
          </FormHelperText>
        </FormControl>
      ) : (
        <FormControl fullWidth size="small" sx={formControlStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.caseUnit}
            readOnly={prop.readOnly}
            onChange={handleCaseChange}
            sx={{
              "&.MuiInputBase-root": {
                height: prop.readOnly ? 24 : 40, // Adjusts the overall height of the component
                border: prop.readOnly ? "none" : "block", // Removes border
                // padding: 0,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: prop.readOnly ? "none" : "block", // Removes border around the dropdown
                // padding: 0,
              },
              "& .MuiSelect-icon": {
                display: prop.readOnly ? "none" : "block", // Hides the dropdown icon
              },
              "& .MuiSelect-select": {
                padding: prop.readOnly ? "0px 0px 6px 0px !important" : "auto", // Ensures no padding within the select content
              },
            }}
          >
            {caseUnitList.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText sx={{ color: "red", textWrap: "nowrap" }}>
            {prop.helperText}
          </FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

export default DropdownMenu;
