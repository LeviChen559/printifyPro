import React, { forwardRef, Dispatch, SetStateAction } from "react";
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
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";
import { rowHeightConverter } from "../index";

interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement>;
  itemCode?: string;
  setItemCode?: Dispatch<SetStateAction<string>>;
  customerItemCode?: string;
  setCustomerItemCode?: Dispatch<SetStateAction<string>>;
  lotNumber?: string;
  setLotNumber?: Dispatch<SetStateAction<string>>;
  setProductNameEN?: Dispatch<SetStateAction<string>>;
  setProductNameZH?: Dispatch<SetStateAction<string>>;
  productNameEN?: string;
  productNameZH?: string;
  setIngredient?: Dispatch<SetStateAction<string>>;
  ingredient?: string;
  setWeight?: Dispatch<SetStateAction<string>>;
  allergen?: string;
  setAllergen?: Dispatch<SetStateAction<string>>;
  weight?: string;
  setManufacturedFor?: Dispatch<SetStateAction<string>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  manufacturedFor?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  storage?: string;
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
  allergenStyle?: iTextStyle;
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
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%",gap:4 }}
        >
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
            }
            name="product_name_en"
            style={{
              padding: "0px",
              margin: "0px",
              background:
                prop.editMode === iEditedMode.productNameEn
                  ? "#eeeeee"
                  : "transparent",
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
            rows={prop.productNameENStyle?.rows??2}
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
              padding: "0px",
              margin: "0px",
              background:
                prop.editMode === iEditedMode.productNameZh
                  ? "#eeeeee"
                  : "transparent",
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
              height: rowHeightConverter(prop.productNameZHStyle?.rows ?? 1),
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Allows text to wrap to the next line
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
            }}
            rows={prop.productNameZHStyle?.rows ?? 1}
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
              margin: 0,
              padding: 0,
              display:"flex",
              alignItems: "center",
              justifyContent: "center",
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
              margin: 0,
              padding: 0,
              display:"flex",
              alignItems: "center",
              justifyContent: "center",
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
        <Col alignItems="flex-start" gap={4}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            style={{
              width: "100%",
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
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.ingredient.color,
              fontStyle: prop.ingredientStyle
                ? prop.ingredientStyle.fontStyle
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.ingredient.fontStyle,
              fontWeight: prop.ingredientStyle
                ? prop.ingredientStyle.fontWeight
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.ingredient.fontWeight,
              lineHeight: prop.ingredientStyle
                ? prop.ingredientStyle.lineHeight
                : prop.defaultLabelStyle.ingredient.lineHeight, // Adjust for consistent spacing
              background:
                prop.editMode === iEditedMode.ingredient
                  ? "#eeeeee"
                  : "transparent",

              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
              height: rowHeightConverter(prop.ingredientStyle?.rows ?? 3),
            }}
            rows={prop.ingredientStyle?.rows}
            placeholder="ingredient"
            value={prop.ingredient}
            onChange={(e) => {
              prop.setIngredient && prop.setIngredient(e.target.value);
            }}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredient)
            }
          />
          <EditTextarea
            readonly={!prop.isEditedMode}
            style={{
              width: "100%",
              margin: 0,
              padding: 0,
              display:"flex",
              alignItems: "center",
              fontSize: prop.allergenStyle
                ? prop.allergenStyle.fontSize
                : prop.defaultLabelStyle.allergen.fontSize,
              fontFamily:
              prop.allergenStyle
                ? prop.allergenStyle.fontFamily
                : prop.defaultLabelStyle.allergen.fontFamily,
              color:
              prop.allergenStyle
                ? prop.allergenStyle.color
                : prop.defaultLabelStyle.allergen.color,
              fontStyle:
              prop.allergenStyle
              ? prop.allergenStyle.fontStyle
              : prop.defaultLabelStyle.allergen.fontStyle,
              fontWeight:
              prop.allergenStyle
              ? prop.allergenStyle.fontWeight
              : prop.defaultLabelStyle.allergen.fontWeight,
              lineHeight: prop.allergenStyle
              ? prop.allergenStyle.lineHeight
              : prop.defaultLabelStyle.allergen.lineHeight,
              background:
                prop.editMode === iEditedMode.allergen
                  ? "#eeeeee"
                  : "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
              height: rowHeightConverter(prop.allergenStyle?.rows ?? 1),
            }}
            placeholder="allergens"
            value={prop.labelInfo.allergen}
            rows={prop.allergenStyle?.rows??.25}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.allergen)
            }
            onChange={(e) =>
              prop.setAllergen && prop.setAllergen(e.target.value)
            }
          />
        </Col>
      </Ingredients>
      <Row zIndex={2} background="#ffffff" justifyContent="space-evenly">
        <Typography
          variant="caption"
          textAlign="center"
          fontWeight={700}
          width="55px"
        >
          Net Weight :
        </Typography>
        <Row width="auto" gap={!prop.isEditedMode ? 8 : 0}>
          <EditText
            readonly={!prop.isEditedMode}
            name="weight"
            type="text"
            style={{
              display:"flex",
              alignItems: "center",
              minHeight: 24,
              padding: "0px 0",
              margin:"0",
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.weight.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.weight.fontFamily,
              color:
                prop.defaultLabelStyle && prop.defaultLabelStyle.weight.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.weight.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.weight.fontWeight,
              background: "transparent",
              width: prop.isEditedMode ? 75 : "auto",
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.weight ? prop.weight : "0"}
            onChange={(e) => prop.setWeight && prop.setWeight(e.target.value)}
          />
          <EditText
            readonly={!prop.isEditedMode}
            name="case_quantity"
            type="text"
            style={{
              display:"flex",
              alignItems: "center",
              minHeight: 24,
              padding: "0px 0",
              margin:"0",
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
              width: prop.isEditedMode ? 25 : "auto",
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.caseQuantity ? prop.caseQuantity.toString() : "0"}
            onChange={(e) =>
              prop.setCaseQuantity &&
              prop.setCaseQuantity(Number(e.target.value))
            }
          />
          <EditText
            readonly={!prop.isEditedMode}
            name="case_unit"
            type="text"
            style={{
              display:"flex",
              alignItems: "center",
              minHeight: 24,
              padding: "0px 0",
              margin:"0",
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.case_unit.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.case_unit.fontFamily,
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.case_unit.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.case_unit.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.case_unit.fontWeight,
              background: "transparent",
              width: prop.isEditedMode ? 50 : "auto",
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.caseUnit ? prop.caseUnit : "0"}
            onChange={(e) =>
              prop.setCaseUnit && prop.setCaseUnit(e.target.value)
            }
          />
        </Row>
        <Typography noWrap textOverflow="clip" fontWeight={700}>
          MADE IN CANADA
        </Typography>
      </Row>
      <Row height="auto">
        <Typography variant="body2" width="auto" noWrap fontWeight={700}>
          LOT :
        </Typography>
        <EditText
          readonly={!prop.isEditedMode}
          style={{
            width: 100,
            display:"flex",
            alignItems: "center",
            minHeight: 24,
            padding: "0px 0",
            margin:"0",
            fontSize:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.lot_number?.fontSize,
            fontFamily:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.lot_number?.fontFamily,
            color:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.lot_number?.color,
            fontStyle:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.lot_number?.fontStyle,
            fontWeight:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.lot_number?.fontWeight,
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
        <EditText
          name="storage"
          type="text"
          style={{
            display:"flex",
            alignItems: "center",
            minHeight: 24,
            padding: "0px 0",
            margin:"0",
            fontSize:
              prop.defaultLabelStyle && prop.defaultLabelStyle.storage.fontSize,
            fontFamily:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.storage.fontFamily,
            color:
              prop.defaultLabelStyle && prop.defaultLabelStyle.storage.color,
            fontStyle:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.storage.fontStyle,
            fontWeight:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.storage.fontWeight,
            background: "transparent",
            width: prop.isEditedMode ? 150 : "auto",
            border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
            borderRadius: prop.isEditedMode ? "4px" : "none",
          }}
          value={prop.storage ? prop.storage : "0"}
          onChange={(e) => prop.setStorage && prop.setStorage(e.target.value)}
        />
      </Row>
      <InfomationWrapper>
        <Col width={"50%"} gap={4}>
          <Row alignItems="center" width="100%">
            <Typography variant="body2" width={200} fontWeight={700}>
              Best Before :
            </Typography>
            <EditText
              readonly={!prop.isEditedMode}
              style={{
                width: 85,
                display:"flex",
                alignItems: "center",
                minHeight: 24,
                padding: "0px 0",
                margin:"0",
                fontSize:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.shelf_life.fontSize,
                fontFamily:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.shelf_life.fontFamily,
                color:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.shelf_life.color,
                fontStyle:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.shelf_life.fontStyle,
                fontWeight:
                  prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.shelf_life.fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "nowrap", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder=""
              value={""}
              onChange={(e) =>
                prop.setStorage && prop.setStorage(e.target.value)
              }
            />
          </Row>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.manufacturedFor)
            }
            style={{
              width: "100%",
              margin: 0,
              padding: 0,
              fontSize:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.manufactured.fontSize,
              fontFamily:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.manufactured.fontFamily,
              color:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.manufactured.color,
              fontStyle:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.manufactured.fontStyle,
              fontWeight:
                prop.defaultLabelStyle &&
                prop.defaultLabelStyle.manufactured.fontWeight,
              background:
                prop.editMode === iEditedMode.manufacturedFor
                  ? "#eeeeee"
                  : "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.25", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
              height: rowHeightConverter(prop.manufacturedForStyle?.rows ?? 1),
            }}
            placeholder="manufactured"
            rows={prop.manufacturedForStyle?.rows ?? 1}
            value={prop.manufacturedFor}
            onChange={(e) =>
              prop.setManufacturedFor && prop.setManufacturedFor(e.target.value)
            }
          />
        </Col>
        <InfomationColumn width={"50%"} zIndex={0}>
          <Barcode
            value={prop.labelInfo.case_gtin.substring(0, 11) ?? "111111111111"}
            width={1.4}
            height={35}
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
