import React, { forwardRef } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
  Col,
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
  ref: React.RefObject<HTMLDivElement>;
  itemCode?: string;
  setItemCode?: (value: string) => void;
  customerItemCode?: string;
  setCustomerItemCode?: (value: string) => void;
  lotNumber?: string;
  setLotNumber?: (value: string) => void;
  setProductNameEN?: (value: string) => void;
  setProductNameZH?: (value: string) => void;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: (value: string) => void;
  ingredientInfo?: string;
  setWeight?: (value: number) => void;
  weight?: number;
  setManufacturedFor?: (value: string) => void;
  caseUnit?: string;
  setCaseUnit?: React.Dispatch<React.SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: (value: number) => void;
  manufacturedFor?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  storageRequirements?: string;
  setStorageRequirements?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientInfoStyle?: iTextStyle;
  manufacturedForStyle?: iTextStyle;
  storageRequirementsStyle?: iTextStyle;
  weightUnitStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  const now = new Date();
  const bestByValue = new Date(
    now.getTime() + prop.labelInfo.shelf_life * 24 * 60 * 60 * 1000
  );
  const formattedDate =
    String(bestByValue.getDate()).padStart(2, "0") +
    "/" +
    String(bestByValue.getMonth() + 1).padStart(2, "0") +
    "/" +
    bestByValue.getFullYear();

  const rowHeightConverter = (rows: number) => {
    switch (rows) {
      case 1:
        return 32;
      case 1.25:
        return 46;
      case 1.5:
        return 52;
      case 1.75:
        return 58;
      case 2:
        return 64;
      case 2.25:
        return 70;
      case 2.5:
        return 76;
      case 2.75:
        return 82;
      case 3:
        return 88;
      default:
        return 64;
    }
  };
  console.log(" prop.defaultLabelStyle", prop.defaultLabelStyle);

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} fontSize={48} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
            }
            name="product_name_en"
            style={{
              padding: "0px",
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
              lineHeight: prop.productNameENStyle?.lineHeight, // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
              height: rowHeightConverter(prop.productNameENStyle?.rows ?? 2),
            }}
            rows={prop.productNameENStyle?.rows ?? 2}
            value={prop.productNameEN}
            onChange={(e) => {
              prop.setProductNameEN && prop.setProductNameEN(e.target.value);
            }}
          />
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
            }
            name="product_name_zh"
            style={{
              display: "block",
              padding: "0px",
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
              lineHeight: prop.productNameZHStyle?.lineHeight,
              height: rowHeightConverter(prop.productNameZHStyle?.rows ?? 2),
              overflow: "hidden",
            }}
            rows={prop.productNameZHStyle?.rows ?? 2}
            value={prop.productNameZH}
            onChange={(e) =>
              prop.setProductNameZH && prop.setProductNameZH(e.target.value)
            }
          />
        </div>
      </Header>
      <Ingredients>
        <Col width="auto" justifyContent="space-evenly" height="76px">
          <EditText
            name="Item_Code"
            type="text"
            style={{
              margin: "0px",
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontFamily,
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontWeight,
              background: "transparent",
              width: 60,
              minHeight: 24,
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.itemCode ? prop.itemCode.toString() : "0"}
            onChange={(e) =>
              prop.setItemCode && prop.setItemCode(e.target.value)
            }
          />
          <EditText
            name="Customer_Item_Code"
            type="text"
            style={{
              margin: "0px",
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontFamily,
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.item_code.fontWeight,
              background: "transparent",
              width: 60,
              minHeight: 24,
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={
              prop.customerItemCode ? prop.customerItemCode.toString() : "0"
            }
            onChange={(e) =>
              prop.setCustomerItemCode &&
              prop.setCustomerItemCode(e.target.value)
            }
          />
        </Col>
        <Col>
          <EditTextarea
            readonly={!prop.isEditedMode}
            style={{
              width: "100%",
              height: 70,
              padding: "0px",
              margin: "0px",
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient_info.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient_info.fontFamily,
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient_info.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient_info.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient_info.fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            rows={2.5}
            placeholder="ingredient_info"
            value={prop.ingredientInfo}
            onChange={(e) => {
              prop.setIngredientInfo && prop.setIngredientInfo(e.target.value);
            }}
            onEditMode={() => console.log("edit mode")}
          />
        </Col>
      </Ingredients>
      <Row zIndex={2} background="#ffffff">
        <Typography variant="body2" noWrap width={"auto"}>
          Net Weight :
        </Typography>
        <EditText
          name="weight"
          type="number"
          style={{
            fontSize:
              prop.defaultLabelStyle && prop.defaultLabelStyle.weight.fontSize,
            fontFamily:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.weight.fontFamily,
            color:
              prop.defaultLabelStyle && prop.defaultLabelStyle.weight.color,
            fontStyle:
              prop.defaultLabelStyle && prop.defaultLabelStyle.weight.fontStyle,
            fontWeight:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.weight.fontWeight,
            background: "transparent",
            width: prop.isEditedMode ? 55 : "auto",
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
          value={prop.weightUnit as string}
          onChange={prop.setWeightUnit as (value: string) => void}
          width={prop.isEditedMode ? 75 : "auto"}
          readOnly={!prop.isEditedMode}
          isOnLabelCard={true}
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
            prop.setWeight && prop.setWeight(Number(e.target.value))
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
      <InfomationWrapper>
        <InfomationColumn width={"75%"}>
          <Row height="auto">
            <Typography variant="body2" width="auto" noWrap>
              LOT :
            </Typography>
            <EditText
              readonly={!prop.isEditedMode}
              style={{
                width: 100,
                height: "100%",
                margin: 0,
                fontSize:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.lot_number.fontSize,
                fontFamily:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.lot_number.fontFamily,
                color:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.lot_number.color,
                fontStyle:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.lot_number.fontStyle,
                fontWeight:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.lot_number.fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="lot number"
              value={prop.labelInfo.lot_number}
              onChange={(e) =>
                prop.setLotNumber && prop.setLotNumber(e.target.value)
              }
            />
            <DropdownMenu
              type="storage_requirements"
              value={prop.storageRequirements as string}
              onChange={prop.setStorageRequirements as (value: string) => void}
              width={120}
              readOnly={!prop.isEditedMode}
              isOnLabelCard={true}
            />
          </Row>
          <Row height="100%" alignItems="flex-start" gap={8}>
            <Col alignItems="flex-start" width="95px">
              <Typography variant="body2" width={"100%"}>
                Best Before :
              </Typography>
              <EditText
                readonly={!prop.isEditedMode}
                style={{
                  width: 85,
                  height: 25,
                  margin: 0,
                  fontSize:
                    prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements.fontSize,
                  fontFamily:
                    prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements.fontFamily,
                  color:
                    prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements.color,
                  fontStyle:
                    prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements.fontStyle,
                  fontWeight:
                    prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements.fontWeight,
                  background: "transparent",
                  overflow: "hidden", // Hide scrollbar for a clean look
                  whiteSpace: "nowrap", // Ensures text wraps correctly
                  overflowWrap: "break-word", // Breaks long words if necessary
                  resize: "none", // Prevents resizing to maintain consistent font size view
                  lineHeight: "1", // Adjust for consistent spacing
                  border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                  borderRadius: prop.isEditedMode ? "4px" : "none",
                }}
                placeholder="storage"
                value={formattedDate}
                onChange={(e) =>
                  prop.setStorageRequirements &&
                  prop.setStorageRequirements(e.target.value)
                }
              />
            </Col>
            <EditTextarea
              readonly={!prop.isEditedMode}
              style={{
                width: "100%",
                height: 64,
                margin: 0,
                padding: 0,
                fontSize:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.manufactured_for.fontSize,
                fontFamily:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.manufactured_for.fontFamily,
                color:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.manufactured_for.color,
                fontStyle:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.manufactured_for.fontStyle,
                fontWeight:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.manufactured_for.fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1.25", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="manufactured_for"
              rows={2}
              value={prop.manufacturedFor}
              onChange={(e) =>
                prop.setManufacturedFor &&
                prop.setManufacturedFor(e.target.value)
              }
            />
          </Row>
        </InfomationColumn>
        <InfomationColumn width={"25%"} zIndex={0}>
          <div
            style={{
              transform: "rotate(270deg) translateY(-36px) translateX(6px)",
            }}
          >
            <Barcode
              value={
                prop.labelInfo.case_gtin.substring(0, 11) ?? "111111111111"
              }
              width={1.1}
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
