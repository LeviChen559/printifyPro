import React, { FC } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface iProps {
  type: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  setCaseUnit?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
  caseUnit?: string;
  readOnly?: boolean;
}

const DropdownMenu: FC<iProps> = (prop) => {
  const handleWeightChange = (event: SelectChangeEvent) => {
    prop.setWeightUnit && prop.setWeightUnit(event.target.value as string);
  };
  const handleCaseChange = (event: SelectChangeEvent) => {
    prop.setCaseUnit && prop.setCaseUnit(event.target.value as string);
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
  return (
    <Box sx={{ width: 100, padding: "0" }}>
      {prop.type === "weight" ? (
        <FormControl
          fullWidth
          sx={{ height: prop.readOnly ? 24 : 32, background: "#ffffff80" }}
        >
          {/* <InputLabel id="demo-simple-select-label" sx={{ paddingTop:  prop.readOnly ? -5 : 0 }}>
            Weight Unit
          </InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.weightUnit}
            readOnly={prop.readOnly}
            // label="Weight Unit"
            onChange={handleWeightChange}
            sx={{
              "&.MuiInputBase-root": {
                height: prop.readOnly ? 24 : 32, // Adjusts the overall height of the component
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
                padding: prop.readOnly ? "0px !important" : "auto", // Ensures no padding within the select content
              },
            }}
          >
            {weightUnitList.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <FormControl
          fullWidth
          sx={{ height: prop.readOnly ? 24 : 32, background: "#ffffff80" }}
        >
          {/* <InputLabel id="demo-simple-select-label">Case Unit</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.caseUnit}
            // label="Case Unit"
            readOnly={prop.readOnly}
            onChange={handleCaseChange}
            sx={{
              "&.MuiInputBase-root": {
                height: prop.readOnly ? 24 : 32, // Adjusts the overall height of the component
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
                padding: prop.readOnly ? "0px !important" : "auto", // Ensures no padding within the select content
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
        </FormControl>
      )}
    </Box>
  );
};

export default DropdownMenu;
