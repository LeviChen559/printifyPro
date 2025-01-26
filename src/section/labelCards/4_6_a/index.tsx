import React, { forwardRef,Dispatch,SetStateAction } from "react";
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
import {rowHeightConverter} from "../index"

interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> | undefined;
  setProductNameEN?: Dispatch<SetStateAction<string>>;
  setProductNameZH?: Dispatch<SetStateAction<string>>;
  productNameEN?: string;
  productNameZH?: string;
  setIngredient?: Dispatch<SetStateAction<string>>;
  ingredient?: string;
  setWeight?: Dispatch<SetStateAction<string>>;
  weight?: string;
  setManufacturedFor?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufacturedFor?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  setStorage?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedForStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  weightUnitStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  // const now = new Date();
  // const bestByValue = new Date(
  //   now.getTime() + prop.labelInfo.shelf_life * 24 * 60 * 60 * 1000
  // );
  // const formattedDate =
  //   String(bestByValue.getDate()).padStart(2, "0") +
  //   "/" +
  //   String(bestByValue.getMonth() + 1).padStart(2, "0") +
  //   "/" +
  //   bestByValue.getFullYear();

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} fontSize={48} />
        <div style={{ height: "auto", width: "55%" }}>
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
              height:32,
              background: "transparent",
              fontSize: prop.productNameENStyle
                ? prop.productNameENStyle.fontSize
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontSize,
              fontFamily: prop.productNameENStyle
                ? prop.productNameENStyle.fontFamily
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontFamily,
              color: prop.productNameENStyle && prop.productNameENStyle.color,
              fontStyle: prop.productNameENStyle
                ? prop.productNameENStyle.fontStyle
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontStyle,
              fontWeight: prop.productNameENStyle
                ? prop.productNameENStyle.fontWeight
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.product_name_en.fontWeight,
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
        <div style={{ height: "auto", width: "30%" }}>
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
                  prop.defaultLabelStyle.product_name_zh.fontSize,
              fontFamily: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontFamily
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontFamily,
              color: prop.productNameZHStyle && prop.productNameZHStyle.color,
              fontStyle: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontStyle
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontStyle,
              fontWeight: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontWeight
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontWeight,
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Allows text to wrap to the next line
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: prop.productNameENStyle?.lineHeight, // Adjust for consistent spacing
              height: rowHeightConverter(prop.productNameENStyle?.rows ?? 2),
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
        <div style={{ width: "100%", overflow: "hidden", height: "100%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredient)
            }
            style={{
              width: "100%",
              height: "100%",
              padding: "0px",
              margin: "0px",
              fontSize: prop.ingredientStyle
                ? prop.ingredientStyle.fontSize
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient.fontSize,
              fontFamily: prop.ingredientStyle
                ? prop.ingredientStyle.fontFamily
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient.fontFamily,
              color: prop.ingredientStyle
                ? prop.ingredientStyle.color
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient.color,
              fontStyle: prop.ingredientStyle
                ? prop.ingredientStyle.fontStyle
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient.fontStyle,
              fontWeight: prop.ingredientStyle
                ? prop.ingredientStyle.fontWeight
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient.fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.35", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            rows={prop.ingredientStyle?.rows??4}
            placeholder="ingredient"
            value={prop.ingredient}
            onChange={(e) => {
              prop.setIngredient && prop.setIngredient(e.target.value);
            }}
          />
        </div>
      </Ingredients>
      <InfomationWrapper>
        <InfomationColumn flex={1.75}>
          {/* <Typography variant="body2">
            Contains :&quot;&quot;&quot;&quot;
          </Typography> */}
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
                fontSize: prop.weightStyle
                  ? prop.weightStyle.fontSize
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontSize,
                fontFamily: prop.weightStyle
                  ? prop.weightStyle.fontFamily
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontFamily,
                color: prop.weightStyle
                  ? prop.weightStyle.color
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.color,
                fontStyle: prop.weightStyle
                  ? prop.weightStyle.fontStyle
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontStyle,
                fontWeight: prop.weightStyle
                  ? prop.weightStyle.fontWeight
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontWeight,
                background: "transparent",
                width: 50,
                minHeight: 24,
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              value={prop.weight ? prop.weight.toString() : "0"}
              onChange={(e) =>
                prop.setWeight && prop.setWeight(e.target.value)
              }
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.weight)
              }
            />
            <DropdownMenu
              type="weight_unit"
              value={prop.weightUnit as string}
              onChange={prop.setWeightUnit as (value: string) => void}
              width={50}
              readOnly={!prop.isEditedMode}
              isOnLabelCard={true}
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.weightUnit)
              }
            />
              <EditText
          name="case_quantity"
          type="number"
          style={{
            fontSize:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontSize,
            fontFamily:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontFamily,
            color:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.color,
            fontStyle:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontStyle,
            fontWeight:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontWeight,
            background: "transparent",
            width: prop.isEditedMode ? 55 : "auto",
            minHeight: 24,
            border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
            borderRadius: prop.isEditedMode ? "4px" : "none",
          }}
          value={prop.caseQuantity ? prop.caseQuantity.toString() : "0"}
          onChange={(e) =>
            prop.setCaseQuantity && prop.setCaseQuantity(Number(e.target.value))
          }
        />
        <DropdownMenu
          type="case_unit"
          value={prop.caseUnit as string}
          onChange={prop.setCaseUnit as (value: string) => void}
          width={prop.isEditedMode ? 85 : 50}
          readOnly={!prop.isEditedMode}
          isOnLabelCard={true}
        />
          </Row>
          <Row>
            <Typography variant="body2" noWrap>
           Storage Requirements :
            </Typography>
            <EditText
              readonly={!prop.isEditedMode}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: "4px 0",
                fontSize: prop.storageStyle
                  ? prop.storageStyle.fontSize
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage
                      .fontSize,
                fontFamily: prop.storageStyle
                  ? prop.storageStyle.fontFamily
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage
                      .fontFamily,
                color: prop.storageStyle
                  ? prop.storageStyle.color
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage
                      .color,
                fontStyle: prop.storageStyle
                  ? prop.storageStyle.fontStyle
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage
                      .fontStyle,
                fontWeight: prop.storageStyle
                  ? prop.storageStyle.fontWeight
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage
                      .fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="storage"
              value={prop.labelInfo.storage}
              onChange={(e) =>
                prop.setStorage &&
                prop.setStorage(e.target.value)
              }
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.storage)
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
                padding: 0,
                fontSize: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontSize
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured
                      .fontSize,
                fontFamily: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontFamily
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured
                      .fontFamily,
                color: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.color
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured.color,
                fontStyle: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontStyle
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured
                      .fontStyle,
                fontWeight: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontWeight
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured
                      .fontWeight,
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
              onEditMode={() =>
                prop.setEditMode &&
                prop.setEditMode(iEditedMode.manufacturedFor)
              }
            />
          </div>
        </InfomationColumn>
        <InfomationColumn flex={1}>
          <Typography variant="body2">
            LOT #{prop.labelInfo.item_code}
          </Typography>
          {/* <Typography variant="body2">BEST BY : {formattedDate}</Typography> */}
          <Barcode
            value={prop.labelInfo.case_gtin.substring(0, 11) ?? "111111111111"}
            width={2}
            height={50}
            fontSize={14}
            format="UPC"
          />
        </InfomationColumn>
      </InfomationWrapper>
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
