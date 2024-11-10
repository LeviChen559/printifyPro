import React, { FC } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface iProps {
  type: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  setCaseUnit?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
  caseUnit?: string;
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
    <Box sx={{ width: 80, padding: "8px 0" }}>
      {prop.type === "weight" ? (
        <FormControl fullWidth sx={{ height: 24 }}>
          {/* <InputLabel id="demo-simple-select-label" sx={{height:24}}>Weight Unit</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.weightUnit}
            // label="Weight Unit"
            onChange={handleWeightChange}
            sx={{
              "&.MuiInputBase-root": {
                height: 24, // Adjusts the overall height of the component
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Case Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prop.caseUnit}
            label="Case Unit"
            onChange={handleCaseChange}
            sx={{
              "&.MuiInputBase-root": {
                height: 32, // Adjusts the overall height of the component
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
