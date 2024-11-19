import React, { forwardRef } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
} from "./style";
import { iLabelInfo } from "@/type/labelType";
import { Typography } from "@mui/material";
import Barcode from "react-barcode";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import DropdownMenu from "@/components/dropdownMenu";
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";

interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> ;
  setProductNameEN?: (value: string) => void;
  setProductNameZH?: (value: string) => void;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: (value: string) => void;
  ingredientInfo?: string;
  setWeight?: (value: number) => void;
  weight?: number;
  setManufacturedFor?: (value: string) => void;
  manufacturedFor?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  setStorageRequirements?: (value: string) => void;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
}
export type Ref = HTMLDivElement;


const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  // const now = new Date();
  // const bestByValue = new Date(now.getTime() + (prop.labelInfo.shelf_life * 24 * 60 * 60 * 1000))
  // const formattedDate = 
  // String(bestByValue.getDate()).padStart(2, '0') + "/" + 
  // String(bestByValue.getMonth() + 1).padStart(2, '0') + "/" + 
  // bestByValue.getFullYear();

   
  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} fontSize={48} />
        <div style={{ height: "auto", width: "60%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
            }
            name="product_name_en"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px",
              background: "transparent",
              fontSize: prop.productNameENStyle
                ? prop.productNameENStyle.fontSize
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_en).fontSize,
              fontFamily: prop.productNameENStyle
                ? prop.productNameENStyle.fontFamily
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_en).fontFamily,
              color: prop.productNameENStyle && prop.productNameENStyle.color,
              fontStyle: prop.productNameENStyle
                ? prop.productNameENStyle.fontStyle
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_en).fontStyle,
              fontWeight: prop.productNameENStyle
                ? prop.productNameENStyle.fontWeight
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_en).fontWeight,
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Allows text to wrap to the next line
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.2", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.productNameEN}
            onChange={(e) => {
              prop.setProductNameEN && prop.setProductNameEN(e.target.value);
            }}
          />
        </div>
        <div style={{ height: "auto", width: "40%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
            }
            name="product_name_zh"
            style={{
              padding: "0px",
              display: "flex",
              alignItems: "center",
              background: "transparent",
              fontSize: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontSize
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_zh).fontSize,
              fontFamily: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontFamily
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_zh).fontFamily,
              color: prop.productNameZHStyle && prop.productNameZHStyle.color,
              fontStyle: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontStyle
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_zh).fontStyle,
              fontWeight: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontWeight
                : prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.product_name_zh).fontWeight,
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.productNameZH}
            onChange={(e) =>
              prop.setProductNameZH && prop.setProductNameZH(e.target.value)
            }
          />
        </div>
      </Header>
      <Ingredients>
        <Typography width={"100%"}>Ingredients:</Typography>
        <div style={{ width: "100%", overflow: "hidden", height: 64 }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            style={{
              width: "100%",
              height: "100%",
              padding: "0px",
              margin: "0px",
              fontSize:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.ingredient_info).fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.ingredient_info).fontFamily,
              color:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.ingredient_info).color,
              fontStyle:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.ingredient_info).fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.ingredient_info).fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.35", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            rows={2}
            placeholder="I am an editable textarea"
            value={prop.ingredientInfo}
            onChange={(e) => {
              prop.setIngredientInfo && prop.setIngredientInfo(e.target.value);
            }}
            onEditMode={() => console.log("edit mode")}
          />
        </div>
      </Ingredients>
      <InfomationWrapper>
        <InfomationColumn flex={1.75}>
          <Typography variant="body2">
            Contains :&quot;&quot;&quot;&quot;
          </Typography>
          <Row>
            <Typography variant="body2" noWrap>
              Net Weight :
            </Typography>
            <EditText
              name="weight"
              type="number"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.weight).fontSize,
                fontFamily:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.weight).fontFamily,
                color:
                  prop.defaultLabelStyle && JSON.parse(prop.defaultLabelStyle.weight).color,
                fontStyle:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.weight).fontStyle,
                fontWeight:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.weight).fontWeight,
                background: "transparent",
                width: 85,
                minHeight: 24,
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              value={prop.weight ? prop.weight.toString() : "0"}
              onChange={(e) =>
                prop.setWeight && prop.setWeight(Number(e.target.value))
              }
            />
            <DropdownMenu
              type="weight_unit"
              weightUnit={prop.weightUnit}
              setWeightUnit={prop.setWeightUnit}
              width="40%"
              readOnly={!prop.isEditedMode}
              isOnLabeCard={true}
            />
          </Row>
          <Row>
          <EditText
            readonly={!prop.isEditedMode}
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding:"4px 0",
              fontSize:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.storage_requirements).fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.storage_requirements).fontFamily,
              color:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.storage_requirements).color,
              fontStyle:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.storage_requirements).fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                JSON.parse(prop.defaultLabelStyle.storage_requirements).fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            placeholder="I am an editable textarea"
            value={prop.labelInfo.storage_requirements}
            onChange={(e) =>
              prop.setStorageRequirements && prop.setStorageRequirements(e.target.value)
            }
          />
        </Row>
          <Typography variant="body2">Manufactured For:</Typography>
          <div style={{ width: "100%", height: 44 }}>
            <EditTextarea
              readonly={!prop.isEditedMode}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding:0,
                fontSize:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.manufactured_for).fontSize,
                fontFamily:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.manufactured_for).fontFamily,
                color:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.manufactured_for).color,
                fontStyle:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.manufactured_for).fontStyle,
                fontWeight:
                  prop.defaultLabelStyle &&
                  JSON.parse(prop.defaultLabelStyle.manufactured_for).fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1.25", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="I am an editable textarea"
              rows={1.25}
              value={prop.manufacturedFor}
              onChange={(e) =>
                prop.setManufacturedFor &&
                prop.setManufacturedFor(e.target.value)
              }
            />
          </div>
        </InfomationColumn>
        <InfomationColumn flex={1}>
          {/* <Typography variant="body2">
            LOT #{prop.labelInfo.item_code}
          </Typography>
          <Typography variant="body2">BEST BY : {formattedDate}</Typography> */}
         <div style={{transform: "rotate(270deg) translateY(-35px) translateX(-30px)",}}>
          <Barcode
            value={prop.labelInfo.case_gtin.substring(0, 11) ?? "111111111111"}
            width={1.25}
            height={50}
            fontSize={14}
            format="UPC"
          />
          </div>
        </InfomationColumn>
      </InfomationWrapper>
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
