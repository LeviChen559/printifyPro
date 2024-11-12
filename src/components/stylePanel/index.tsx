import React, { FC, ChangeEvent } from "react";
import { Container, Content } from "./style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  iTextStyleMode,
  iEditedMode,
  iTextStyle,
} from "@/type/labelType";
import { Typography } from "@mui/material";
interface iProps {
  isEditMode: iEditedMode;
  productNameENStyle: iTextStyle;
  productNameZHStyle: iTextStyle;
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
      default:
        return "";
    }
  };

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
            value={
              prop.isEditMode === iEditedMode.productNameEn
                ? prop.productNameENStyle.fontStyle
                : prop.productNameZHStyle.fontStyle
            }
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
              prop.isEditMode === iEditedMode.productNameEn
                ? prop.productNameENStyle.fontFamily
                : prop.productNameZHStyle.fontFamily
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
              prop.isEditMode === iEditedMode.productNameEn
                ? prop.productNameENStyle.fontWeight
                : prop.productNameZHStyle.fontWeight
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
              prop.isEditMode === iEditedMode.productNameEn
                ? prop.productNameENStyle.fontSize
                : prop.productNameZHStyle.fontSize
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
