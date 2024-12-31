import React, { FC, ChangeEvent } from "react";
import { Container, Content } from "./style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { iTextStyleMode, iEditedMode, iTextStyle } from "@/type/labelType";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

interface iProps {
  isEditMode: iEditedMode;
  productNameENStyle: iTextStyle;
  productNameZHStyle: iTextStyle;
  weightStyle: iTextStyle;
  ingredientInfoStyle: iTextStyle;
  manufacturedForStyle: iTextStyle;
  storageRequirementsStyle: iTextStyle;
  weightUnitStyle: iTextStyle;
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    dataType: iEditedMode,
    styleType: iTextStyleMode
  ) => void;
}
const StylePanel: FC<iProps> = (prop) => {
  const textStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: 14,
      height: 24,
      display: "flex",
      alignItems: "center",
    },
  };

  const modeConverter = (mode: iEditedMode) => {
    switch (mode) {
      case iEditedMode.productNameEn:
        return "Product Name (English)";
      case iEditedMode.productNameZh:
        return "Product Name (Chinese)";
      case iEditedMode.ingredientInfo:
        return "Ingredient Info";
      case iEditedMode.weight:
        return "Weight";
      case iEditedMode.weightUnit:
        return "Weight Unit";
      case iEditedMode.manufacturedFor:
        return "Manufactured For";
      case iEditedMode.storageRequirements:
        return "Storage Requirements";
      default:
        return "";
    }
  };

  const fontStyleConverter = (mode: iEditedMode) => {
    let fontStyle;

    switch (mode) {
      case iEditedMode.productNameEn:
        fontStyle = prop.productNameENStyle.fontStyle;
        break;
      case iEditedMode.productNameZh:
        fontStyle = prop.productNameZHStyle.fontStyle;
        break;
      case iEditedMode.ingredientInfo:
        fontStyle = prop.ingredientInfoStyle.fontStyle;
        break;
      case iEditedMode.weight:
        fontStyle = prop.weightStyle.fontStyle;
        break;
      case iEditedMode.weightUnit:
        fontStyle = prop.weightUnitStyle.fontStyle;
        break;
      case iEditedMode.manufacturedFor:
        fontStyle = prop.manufacturedForStyle.fontStyle;
        break;
      case iEditedMode.storageRequirements:
        fontStyle = prop.storageRequirementsStyle.fontStyle;
        break;
      default:
        fontStyle = null; // Or provide a default value
    }
    return fontStyle;
  };

  const fontFamilyConverter = (mode: iEditedMode) => {
    let fontFamily;

    switch (mode) {
      case iEditedMode.productNameEn:
        fontFamily = prop.productNameENStyle.fontFamily;
        break;
      case iEditedMode.productNameZh:
        fontFamily = prop.productNameZHStyle.fontFamily;
        break;
      case iEditedMode.ingredientInfo:
        fontFamily = prop.ingredientInfoStyle.fontFamily;
        break;
      case iEditedMode.weight:
        fontFamily = prop.weightStyle.fontFamily;
        break;
      case iEditedMode.weightUnit:
        fontFamily = prop.weightUnitStyle.fontFamily;
        break;
      case iEditedMode.manufacturedFor:
        fontFamily = prop.manufacturedForStyle.fontFamily;
        break;
      case iEditedMode.storageRequirements:
        fontFamily = prop.storageRequirementsStyle.fontFamily;
        break;
      default:
        fontFamily = null; // Or provide a default value
    }
    return fontFamily;
  };

  const fontWeightConverter = (mode: iEditedMode) => {
    let fontWeight;
    switch (mode) {
      case iEditedMode.productNameEn:
        fontWeight = prop.productNameENStyle.fontWeight;
        break;
      case iEditedMode.productNameZh:
        fontWeight = prop.productNameZHStyle.fontWeight;
        break;
      case iEditedMode.ingredientInfo:
        fontWeight = prop.ingredientInfoStyle.fontWeight;
        break;
      case iEditedMode.weight:
        fontWeight = prop.weightStyle.fontWeight;
        break;
      case iEditedMode.weightUnit:
        fontWeight = prop.weightUnitStyle.fontWeight;
        break;
      case iEditedMode.manufacturedFor:
        fontWeight = prop.manufacturedForStyle.fontWeight;
        break;
      case iEditedMode.storageRequirements:
        fontWeight = prop.storageRequirementsStyle.fontWeight;
        break;
      default:
        fontWeight = null; // Or provide a default value
    }
    return fontWeight;
  };
  const fontSizeConverter = (mode: iEditedMode) => {
    let fontSize;
    switch (mode) {
      case iEditedMode.productNameEn:
        fontSize = prop.productNameENStyle.fontSize;
        break;
      case iEditedMode.productNameZh:
        fontSize = prop.productNameZHStyle.fontSize;
        break;
      case iEditedMode.ingredientInfo:
        fontSize = prop.ingredientInfoStyle.fontSize;
        break;
      case iEditedMode.weight:
        fontSize = prop.weightStyle.fontSize;
        break;
      case iEditedMode.weightUnit:
        fontSize = prop.weightUnitStyle.fontSize;
        break;
      case iEditedMode.manufacturedFor:
        fontSize = prop.manufacturedForStyle.fontSize;
        break;
      case iEditedMode.storageRequirements:
        fontSize = prop.storageRequirementsStyle.fontSize;
        break;
      default:
        fontSize = 14; // Or provide a default value
    }
    return fontSize;
  };
  const RowsConverter = (mode: iEditedMode) => {
    let rows;
    switch (mode) {
      case iEditedMode.productNameEn:
        rows = prop.productNameENStyle.rows;
        break;
      case iEditedMode.productNameZh:
        rows = prop.productNameZHStyle.rows;
        break;
      case iEditedMode.ingredientInfo:
        rows = prop.ingredientInfoStyle.rows;
        break;

      case iEditedMode.manufacturedFor:
        rows = prop.manufacturedForStyle.rows;

        break;
      default:
        rows = 2; // Or provide a default value
    }
    return rows;
  };
  const LineHeightConverter = (mode: iEditedMode) => {
    let lineHeight;
    switch (mode) {
      case iEditedMode.productNameEn:
        lineHeight = prop.productNameENStyle.lineHeight;
        break;
      case iEditedMode.productNameZh:
        lineHeight = prop.productNameZHStyle.lineHeight;
        break;
      case iEditedMode.ingredientInfo:
        lineHeight = prop.ingredientInfoStyle.lineHeight;
        break;

      case iEditedMode.manufacturedFor:
        lineHeight = prop.manufacturedForStyle.lineHeight;

        break;
      default:
        lineHeight = 1; // Or provide a default value
    }
    return lineHeight;
  };
  function valuetext(value: number) {
    return `${value}px`;
  }
  const FontSizemarks = [
    {
      value: 14,
      label: "14px",
    },
    {
      value: 20,
      label: "20px",
    },
    {
      value: 28,
      label: "28px",
    },
  ];

  const Rowsmarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
  ];

  return prop.isEditMode !== iEditedMode.empty ? (
    <Container>
      <Typography>{modeConverter(prop.isEditMode)}</Typography>
      <Content>
        <FormControl sx={{ height: "auto", padding: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
            Font Sytle
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={fontStyleConverter(prop.isEditMode)}
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontStyle)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value="Normal"
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Normal"
              sx={textStyle}
            />
            <FormControlLabel
              value="Italic"
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Italic"
              sx={textStyle}
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ height: "auto", padding: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
            Font Family
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={fontFamilyConverter(prop.isEditMode)}
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontFamily)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value="Arial"
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Arial"
              sx={textStyle}
            />
            <FormControlLabel
              value="Lato"
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Lato"
              sx={textStyle}
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ height: "auto", padding: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
            Font Weight
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={fontWeightConverter(prop.isEditMode)}
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontWeight)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value={400}
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Normal"
              sx={textStyle}
            />
            <FormControlLabel
              value={700}
              control={
                <Radio size="small" sx={{ color: "#bcbcbc", padding: "5px" }} />
              }
              label="Bold"
              sx={textStyle}
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ height: "auto", padding: 1, width: 125 }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
            Font Size
          </FormLabel>
          <Slider
            defaultValue={14}
            aria-label="Custom marks"
            valueLabelDisplay="auto"
            step={2}
            marks={FontSizemarks}
            min={14}
            max={28}
            onChange={(e: any) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontSize)
            }
            getAriaValueText={valuetext}
            value={fontSizeConverter(prop.isEditMode)}
            color="primary"
          />
          {/* <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={
              fontSizeConverter(prop.isEditMode)
            }
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontSize)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value={14}
              control={<Radio size="small" sx={{ color: "#bcbcbc",padding:"5px" }} />}
              label="14px"
              sx={textStyle}
            />
            <FormControlLabel
              value={18}
              control={<Radio size="small" sx={{ color: "#bcbcbc",padding:"5px" }} />}
              label="18px"
              sx={textStyle}
            />
            <FormControlLabel
              value={24}
              control={<Radio size="small" sx={{ color: "#bcbcbc",padding:"5px" }} />}
              label="24px"
              sx={textStyle}
            />
          </RadioGroup> */}
        </FormControl>
        {(iEditedMode.productNameEn ||
          iEditedMode.productNameZh ||
          iEditedMode.manufacturedFor ||
          iEditedMode.ingredientInfo) && (
          <FormControl
            sx={{
              height: "auto",
              padding: "8px 8px 8px 16px",
              width: 141,
              boxSizing: "border-box",
            }}
          >
            <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
              Rows
            </FormLabel>
            <Slider
              defaultValue={2}
              aria-label="Custom marks"
              valueLabelDisplay="auto"
              step={.25}
              marks={Rowsmarks}
              min={1}
              max={3}
              onChange={(e: any) =>
                prop.handleChange(e, prop.isEditMode, iTextStyleMode.rows)
              }
              getAriaValueText={valuetext}
              value={RowsConverter(prop.isEditMode)}
              color="primary"
            />
          </FormControl>
        )}
        {(iEditedMode.productNameEn ||
          iEditedMode.productNameZh ||
          iEditedMode.manufacturedFor ||
          iEditedMode.ingredientInfo) && (
          <FormControl
            sx={{
              height: "auto",
              padding: "8px 8px 8px 16px",
              width: 141,
              boxSizing: "border-box",
            }}
          >
            <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
              Line Height
            </FormLabel>
            <Slider
              defaultValue={1.2}
              aria-label="Custom marks"
              valueLabelDisplay="auto"
              step={0.1}
              marks={Rowsmarks}
              min={1}
              max={2}
              onChange={(e: any) =>
                prop.handleChange(e, prop.isEditMode, iTextStyleMode.lineHeight)
              }
              getAriaValueText={valuetext}
              value={LineHeightConverter(prop.isEditMode)}
              color="primary"
            />
          </FormControl>
        )}
      </Content>
    </Container>
  ) : null;
};

export default StylePanel;
