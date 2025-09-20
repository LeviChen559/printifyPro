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
import { autoWidth, autoHeight } from "@/utils/lib/help";

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
  barcode?: string;
  setBarcode?: Dispatch<SetStateAction<string>>;
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
  showLotNumber?: boolean;
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
  const itemCodeStyle = getTextStyle(prop.defaultText);

  const weightStyle = getTextStyle(prop.defaultText);
  const caseUnitStyle = getTextStyle(prop.defaultText);
  const caseQuantityStyle = getTextStyle(prop.defaultText);

  const lotNumberStyle = getTextStyle(prop.defaultText);
  const storageStyle = getTextStyle(prop.defaultText);

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <Col width={60} alignItems="center" gap={8}>
          <LabelLogo logo={prop.logo} size={"lg"}/>
          <EditableTextField
            name={iEditedMode.itemCode}
            value={prop.itemCode}
            onChange={prop.setItemCode}
            style={itemCodeStyle}
            readonly={isEditedMode === false}
            width={prop.itemCode ? autoWidth(prop.itemCode as string) : 40}
            minWidth={40}
            height={autoHeight(14)}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.itemCode)
            }
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
        <Col alignItems="flex-start" gap={6}>
          <Typography variant="body2" width={200} fontWeight={700}>
          Ingredients:
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
            wordBreak="break-all"
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
      <Row zIndex={2} background="#ffffff" justifyContent="flex-start">
        <Typography
          variant="caption"
          textAlign="center"
          fontWeight={700}
          width="70px"
        >
          Net Weight :
        </Typography>
        <Row width="auto" gap={!prop.isEditedMode ? 4 : 0}>
          <EditableTextField
            name={iEditedMode.weight}
            value={prop.weight}
            onChange={prop.setWeight}
            style={weightStyle}
            readonly={isEditedMode === false}
            width={autoWidth(prop.weight as string)}
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
            width={autoWidth(prop.caseQuantity as number)}
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
            width={autoWidth(prop.caseUnit as string)}
            height={autoHeight(14)}
            showBorder={prop.showBorder}
            editMode={prop.editMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.caseUnit)
            }
          />
        </Row>
        <Typography variant="body2" noWrap textOverflow="clip" fontWeight={700}>
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
              minWidth={40}
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
          value={prop.storage}
          onChange={prop.setStorage}
          style={storageStyle}
          readonly={isEditedMode === false}
          width={autoWidth(prop.storage as string)}
          height={autoHeight(14)}
          showBorder={prop.showBorder}
          editMode={prop.editMode}
          onEditMode={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.storage)
          }
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
              readonly={isEditedMode === false}
              width={95}
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
              prop.editMode === iEditedMode.barcode ? "#eeeeee" : "#ffffff"
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
