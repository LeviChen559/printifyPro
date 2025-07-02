import React, { forwardRef, Dispatch, SetStateAction } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
  Col,
} from "../style";
import { iLabelInfo } from "@/type/labelType";
import { Typography } from "@mui/material";
import Barcode from "react-barcode";
import "react-edit-text/dist/index.css";
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";
import EditableTextareaField from "@/components/editableTextareaField";
import EditableTextField from "@/components/editableTextField";
import { autoHeight, autoWidth } from "@/utils/lib/help";

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
  barcode?: string;
  setBarcode?: Dispatch<SetStateAction<string>>;
  editMode: iEditedMode;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  defaultText?: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  allergenStyle?: iTextStyle;
  caseUnitStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
  showBorder: boolean;
  showLotNumber?: boolean;
  bestBefore?: string;
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
  });

  // interface EditableTextFieldProps {
  //   name: string;
  //   value: string | number | undefined;
  //   onChange:
  //     | Dispatch<SetStateAction<string>>
  //     | Dispatch<SetStateAction<number>>
  //     | undefined;
  //   style: React.CSSProperties;
  //   readonly: boolean;
  //   width: string | number;
  //   height: string | number;
  // }

  // const EditableTextField = ({
  //   name,
  //   value,
  //   onChange,
  //   style,
  //   readonly,
  //   width,
  //   height,
  // }: EditableTextFieldProps) => (
  //   <EditText
  //     name={name}
  //     type="text"
  //     style={{
  //       ...style,
  //       display: "flex",
  //       alignItems: "center",
  //       background: "transparent",
  //       minHeight: 24,
  //       border: readonly || !prop.showBorder ? "none" : "1px solid #bcbcbc80",
  //       borderRadius: readonly ? "none" : "4px",
  //       width: width,
  //       height: height,
  //     }}
  //     value={value?.toString()}
  //     onChange={(e) => onChange?.(e.target.value as unknown as string & number)}
  //     readonly={readonly}
  //   />
  // );
  const isEditedMode = prop.isEditedMode;

  // const isParsed = (data: string ) => {
  // if (data==="string"){
  //   return JSON.parse(data);
  // }
  // return data;

  // }

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
  const itemCodeStyle = getTextStyle(prop.defaultText);
  const customerItemCodeStyle = getTextStyle(prop.defaultText);
  const weightStyle = getTextStyle(prop.defaultText);
  const caseUnitStyle = getTextStyle(prop.defaultText);
  const caseQuantityStyle = getTextStyle(prop.defaultText);

  const lotNumberStyle = getTextStyle(prop.defaultText);
  const storageStyle = getTextStyle(prop.defaultText);

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 6,
          }}
        >
          <EditableTextareaField
            name={iEditedMode.productNameEn}
            value={prop.productNameEN}
            onChange={prop.setProductNameEN}
            style={productNameENStyle}
            readonly={isEditedMode === false}
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
            readonly={isEditedMode === false}
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
        <Col
          width="auto"
          justifyContent="space-evenly"
          height="auto"
          gap={6}
          paddingTop={22}
        >
          <EditableTextField
            name={iEditedMode.itemCode}
            value={prop.itemCode}
            onChange={prop.setItemCode}
            style={itemCodeStyle}
            readonly={isEditedMode === false}
            width={autoWidth(Number(prop.itemCode) ?? "00000")}
            height={autoHeight(14)}
            minWidth={40}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.itemCode)
            }
          />
          <EditableTextField
            name={iEditedMode.customerCode}
            value={prop.customerItemCode}
            onChange={prop.setCustomerItemCode}
            style={customerItemCodeStyle}
            readonly={isEditedMode === false}
            width={
              prop.customerItemCode
                ? autoWidth(Number(prop.customerItemCode))
                : 40
            }
            minWidth={40}
            height={autoHeight(14)}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.customerCode)
            }
          />
        </Col>
        <Col alignItems="flex-start" gap={4}>
          <Typography variant="body2" width={200} fontWeight={700}>
            For All Ingredients:
          </Typography>
          <EditableTextareaField
            name={iEditedMode.ingredient}
            value={prop.ingredient}
            onChange={prop.setIngredient}
            style={ingredientStyle}
            readonly={isEditedMode === false}
            rows={prop.ingredientStyle?.rows ?? 5}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredient)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
            wordBreak="normal"
          />
          <EditableTextareaField
            name={iEditedMode.allergen}
            value={prop.allergen}
            onChange={prop.setAllergen}
            style={allergenStyle}
            readonly={isEditedMode === false}
            rows={prop.allergenStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.allergen)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
        </Col>
      </Ingredients>
      <Row
        width="100%"
        zIndex={2}
        background="#ffffff"
        justifyContent="flex-start"
      >
        <Typography
          variant="caption"
          textAlign="center"
          fontWeight={700}
          width="auto"
          noWrap
        >
          Net Weight :
        </Typography>
        <Row width="auto" gap={4}>
          <EditableTextField
            name={iEditedMode.weight}
            value={prop.weight}
            onChange={prop.setWeight}
            style={weightStyle}
            readonly={isEditedMode === false}
            width={prop.weight ? autoWidth(prop.weight) : 40}
            height={autoHeight(14)}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.weight)
            }
          />

          <EditableTextField
            name={iEditedMode.caseQuantity}
            value={prop.caseQuantity}
            onChange={prop.setCaseQuantity}
            style={caseQuantityStyle}
            readonly={isEditedMode === false}
            width={prop.caseQuantity ? autoWidth(prop.caseQuantity) : 40}
            height={autoHeight(14)}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.caseQuantity)
            }
          />
          <Typography variant="body2" fontWeight={700}>
            x
          </Typography>
          <EditableTextField
            name={iEditedMode.caseUnit}
            value={prop.caseUnit}
            onChange={prop.setCaseUnit}
            style={caseUnitStyle}
            readonly={isEditedMode === false}
            width={prop.caseUnit ? autoWidth(prop.caseUnit) : 40}
            height={autoHeight(14)}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.caseUnit)
            }
          />
        </Row>
        <Typography noWrap textOverflow="clip" fontWeight={700} variant="body2">
          MADE IN CANADA
        </Typography>
      </Row>
      <Row height="auto">
        {prop.showLotNumber && (
          <>
            <Typography variant="body2" width="auto" noWrap fontWeight={700}>
              LOT :#
            </Typography>

            <EditableTextField
              name={iEditedMode.lotNumber}
              value={prop.lotNumber}
              onChange={prop.setLotNumber}
              style={lotNumberStyle}
              readonly={isEditedMode === false}
              width={prop.lotNumber ? autoWidth(prop.lotNumber) : 40}
              height={autoHeight(14)}
              showBorder={prop.showBorder}
              editMode={prop.editMode}
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.lotNumber)
              }
            />
          </>
        )}
        <EditableTextField
          name={iEditedMode.storage}
          value={prop.storage??""}
          onChange={prop.setStorage}
          style={storageStyle}
          readonly={isEditedMode === false}
          width={prop.storage?autoWidth(prop.storage,"storage"):40}
          height={autoHeight(14)}
          showBorder={prop.showBorder}
          editMode={prop.editMode}
          textAlign="left"
          onEditMode={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.storage)
          }
        />
      </Row>
      <InfomationWrapper>
        <Col width={"50%"} gap={4}>
          <Row alignItems="center" width="100%">
            <Typography variant="body2" width={"auto"} fontWeight={700}>
              Best Before :
            </Typography>
            <EditableTextField
              name={iEditedMode.bestBefore}
              value={prop.bestBefore ?? ""}
              // onChange={prop.setStorage}
              style={storageStyle}
              readonly={isEditedMode === false}
              width={prop.bestBefore?autoWidth(prop.bestBefore):40}
              height={autoHeight(14)}
              showBorder={prop.showBorder}
              editMode={prop.editMode}
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.bestBefore)
              }
            />
          </Row>
          <EditableTextareaField
            name={iEditedMode.manufactured}
            value={prop.manufactured}
            onChange={prop.setManufactured}
            style={manufacturedStyle}
            readonly={isEditedMode === false}
            rows={prop.manufacturedStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.manufactured)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
        </Col>
        <InfomationColumn
          width={"50%"}
          zIndex={0}
          onClick={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.barcode)
          }
        >
          <Barcode
            value={prop.labelInfo.barcode.substring(0, 11) ?? "111111111111"}
            width={1.4}
            height={35}
            fontSize={14}
            format="UPC"
            background={
              prop.editMode === iEditedMode.barcode ? "#000000" : "#ffffff"
            }
            marginTop={-4}
          />
        </InfomationColumn>
      </InfomationWrapper>
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
