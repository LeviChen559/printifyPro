import React, { FC, ChangeEvent } from "react";
import { Container, Content } from "./style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { iTextStyleMode, iEditedMode, iTextStyle } from "@/type/labelType";
import { Typography } from "@mui/material";
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
    fontSize: 14,
    height: 24,
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
  }
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
        fontSize = null; // Or provide a default value
  
        }
    return fontSize;;
  }


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
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="Normal"
              sx={textStyle}
            />
            <FormControlLabel
              value="Italic"
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
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
            value={
              fontFamilyConverter(prop.isEditMode)
            }
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontFamily)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value="Arial"
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="Arial"
              sx={textStyle}
            />
            <FormControlLabel
              value="Lato"
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
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
            value={
              fontWeightConverter(prop.isEditMode)
            }
            onChange={(e) =>
              prop.handleChange(e, prop.isEditMode, iTextStyleMode.fontWeight)
            }
            name="radio-buttons-group"
            sx={{ gap: 0.5 }}
          >
            <FormControlLabel
              value={400}
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="Normal"
              sx={textStyle}
            />
            <FormControlLabel
              value={700}
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="Bold"
              sx={textStyle}
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ height: "auto", padding: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label" sx={textStyle}>
            Font Size
          </FormLabel>
          <RadioGroup
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
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="14px"
              sx={textStyle}
            />
            <FormControlLabel
              value={18}
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="18px"
              sx={textStyle}
            />
            <FormControlLabel
              value={24}
              control={<Radio size="small" sx={{ color: "#bcbcbc" }} />}
              label="24px"
              sx={textStyle}
            />
          </RadioGroup>
        </FormControl>
      </Content>
    </Container>
  ) : null;
};

export default StylePanel;
