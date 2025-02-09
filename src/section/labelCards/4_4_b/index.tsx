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
import "react-edit-text/dist/index.css";
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";
import { rowHeightConverter } from "../index";
import EditableTextareaField from "@/components/editableTextareaField";
import EditableTextField from "@/components/editableTextField";

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
  setManufactured?: Dispatch<SetStateAction<string>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  manufactured?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  storage?: string;
  setStorage?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode: iEditedMode;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  allergenStyle?: iTextStyle;
  defaultText?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
  showBorder: boolean;
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

  const getTextStyle = (
    customStyle?: iTextStyle,
    defaultStyle?: iTextStyle
  ) => ({
    fontSize: customStyle?.fontSize ?? defaultStyle?.fontSize,
    fontFamily: customStyle?.fontFamily ?? defaultStyle?.fontFamily,
    color: customStyle?.color ?? defaultStyle?.color,
    fontStyle: customStyle?.fontStyle ?? defaultStyle?.fontStyle,
    fontWeight: customStyle?.fontWeight ?? defaultStyle?.fontWeight,
    lineHeight: customStyle?.lineHeight ?? defaultStyle?.lineHeight,
    height: rowHeightConverter(customStyle?.rows ?? 1),
  });


  const isEditedMode = prop.isEditedMode;

  // Memoized styles
  const productNameENStyle = getTextStyle(
    prop.productNameENStyle,
    prop.defaultLabelStyle?.product_name_en
  );
  const productNameZHStyle = getTextStyle(
    prop.productNameZHStyle,
    prop.defaultLabelStyle?.product_name_zh
  );

  const ingredientStyle = getTextStyle(
    prop.ingredientStyle,
     prop.defaultLabelStyle?.ingredient
  );
  const allergenStyle = getTextStyle(
    prop.allergenStyle,
    prop.defaultLabelStyle?.allergen
  );
  const manufacturedStyle = getTextStyle(
    prop.manufacturedStyle,
    prop.defaultLabelStyle?.manufactured
  );
  const itemCodeStyle =getTextStyle(
    prop.defaultText,
  );

  const weightStyle = getTextStyle(
    prop.defaultText,
  );
  const caseUnitStyle = getTextStyle(
    prop.defaultText,
  );
  const caseQuantityStyle =getTextStyle(
    prop.defaultText,
  );

  const lotNumberStyle = getTextStyle(
    prop.defaultText,
  );
  const storageStyle =getTextStyle(
    prop.defaultText,
  );


  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <Col width={60} alignItems="center" >
          <LabelLogo logo={prop.logo} />
          <EditableTextField
            name={iEditedMode.itemCode}
            value={prop.itemCode}
            onChange={prop.setItemCode}
            style={itemCodeStyle}
            readonly={!isEditedMode}
            width={60}
            height={24}
          />
        </Col>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
         <EditableTextareaField
            name={iEditedMode.productNameEn}
            value={prop.productNameEN}
            onChange={prop.setProductNameEN}
            style={productNameENStyle}
            readonly={!isEditedMode}
            rows={prop.productNameENStyle?.rows ?? 2}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
         <EditableTextareaField
            name={iEditedMode.productNameZh}
            value={prop.productNameZH}
            onChange={prop.setProductNameZH}
            style={productNameZHStyle}
            readonly={!isEditedMode}
            rows={prop.productNameZHStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
        </div>
      </Header>
      <Ingredients>
        <Col alignItems="flex-start" gap={4}>
        <EditableTextareaField
            name={iEditedMode.ingredient}
            value={prop.ingredient}
            onChange={prop.setIngredient}
            style={ingredientStyle}
            readonly={!isEditedMode}
            rows={prop.ingredientStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredient)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
          <EditableTextareaField
            name={iEditedMode.allergen}
            value={prop.allergen}
            onChange={prop.setAllergen}
            style={allergenStyle}
            readonly={!isEditedMode}
            rows={prop.allergenStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.allergen)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
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
        <EditableTextField
            name={iEditedMode.weight}
            value={prop.weight}
            onChange={prop.setWeight}
            style={weightStyle}
            readonly={!isEditedMode}
            width={75}
            height={24}
            showBorder={prop.showBorder}
          />
          <EditableTextField
            name={iEditedMode.caseQuantity}
            value={prop.caseQuantity}
            onChange={prop.setCaseQuantity}
            style={caseQuantityStyle}
            readonly={!isEditedMode}
            width={30}
            height={24}
            showBorder={prop.showBorder}
          />
          <EditableTextField
            name={iEditedMode.caseUnit}
            value={prop.caseUnit}
            onChange={prop.setCaseUnit}
            style={caseUnitStyle}
            readonly={!isEditedMode}
            width={60}
            height={24}
            showBorder={prop.showBorder}
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
        <EditableTextField
          name={iEditedMode.lotNumber}
          value={prop.lotNumber}
          onChange={prop.setLotNumber}
          style={lotNumberStyle}
          readonly={!isEditedMode}
          width={120}
          height={24}
          showBorder={prop.showBorder}
        />
        <EditableTextField
          name={iEditedMode.storage}
          value={prop.storage}
          onChange={prop.setStorage}
          style={storageStyle}
          readonly={!isEditedMode}
          width={120}
          height={24}
          showBorder={prop.showBorder}
        />
      </Row>
      <InfomationWrapper>
        <Col width={"50%"} gap={4}>
          <Row alignItems="center" width="100%">
            <Typography variant="body2" width={200} fontWeight={700}>
              Best Before :
            </Typography>
            <EditableTextField
              name={iEditedMode.bestBefore}
              value={""}
              onChange={prop.setStorage}
              style={storageStyle}
              readonly={!isEditedMode}
              width={95}
              height={24}
              showBorder={prop.showBorder}
            />
          </Row>
          <EditableTextareaField
            name={iEditedMode.manufactured}
            value={prop.manufactured}
            onChange={prop.setManufactured}
            style={manufacturedStyle}
            readonly={!isEditedMode}
            rows={prop.manufacturedStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.manufactured)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
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
