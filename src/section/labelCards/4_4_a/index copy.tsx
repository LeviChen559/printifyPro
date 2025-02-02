import React, { forwardRef, Dispatch, SetStateAction,useMemo } from "react";
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
  const getTextStyle = (customStyle?: iTextStyle, defaultStyle?: iTextStyle) => ({
    fontSize: customStyle?.fontSize ?? defaultStyle?.fontSize,
    fontFamily: customStyle?.fontFamily ?? defaultStyle?.fontFamily,
    color: customStyle?.color ?? defaultStyle?.color,
    fontStyle: customStyle?.fontStyle ?? defaultStyle?.fontStyle,
    fontWeight: customStyle?.fontWeight ?? defaultStyle?.fontWeight,
    lineHeight: customStyle?.lineHeight ?? defaultStyle?.lineHeight,
    height:rowHeightConverter(customStyle?.rows ?? 1)
  });
  
  interface EditableTextFieldProps {
    name: string;
    value: string | number | undefined;
    onChange: Dispatch<SetStateAction<string>>|Dispatch<SetStateAction<number>> | undefined;
    style: React.CSSProperties;
    readonly: boolean;
  }

  const EditableTextField = ({ name, value, onChange, style, readonly }: EditableTextFieldProps) => (
    <EditText
      name={name}
      type="text"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        background: "transparent",
        minHeight: 24,
        border: readonly ? "none" : "1px solid #bcbcbc80",
        borderRadius: readonly ? "none" : "4px",
      }}
      value={value?.toString() }
      onChange={(e) => onChange?.(e.target.value as unknown as string & number)}
      readonly={readonly}
    />
  );
  
  interface EditableTextareaFieldProps {
    name: string;
    value: string | number | undefined;
    onChange: Dispatch<SetStateAction<string>> | undefined;
    style: React.CSSProperties;
    readonly: boolean;
    rows?: number;
  }

  const EditableTextareaField = ({ name, value, onChange, style, readonly, rows }: EditableTextareaFieldProps) => (
    <EditTextarea
      name={name}
      style={{
        ...style,
        width: "100%",
        padding: "0px",
        margin: "0px",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        resize: "none",
        border: readonly ? "none" : "1px solid #bcbcbc80",
        borderRadius: readonly ? "none" : "4px",
      }}
      rows={rows ?? 2}
      value={value?.toString() }
      onChange={(e) => onChange?.(e.target.value)}
      readonly={readonly}
    />
  );
  const isEditedMode = prop.isEditedMode;
  
  // Memoized styles
  const productNameENStyle =  getTextStyle(prop.productNameENStyle, prop.defaultLabelStyle?.product_name_en);
  const productNameZHStyle = useMemo(() => getTextStyle(prop.productNameZHStyle, prop.defaultLabelStyle?.product_name_zh), [prop.productNameZHStyle, prop.defaultLabelStyle]);
  // const weightStyle = useMemo(() => getTextStyle(prop.weightStyle, prop.defaultLabelStyle?.weight), [prop.weightStyle, prop.defaultLabelStyle]);
  const ingredientStyle = useMemo(() => getTextStyle(prop.ingredientStyle, prop.defaultLabelStyle?.ingredient), [prop.ingredientStyle, prop.defaultLabelStyle]);
  const manufacturedForStyle = useMemo(() => getTextStyle(prop.manufacturedForStyle, prop.defaultLabelStyle?.manufactured), [prop.manufacturedForStyle, prop.defaultLabelStyle]);
  const storageStyle = useMemo(() => getTextStyle(prop.storageStyle, prop.defaultLabelStyle?.storage), [prop.storageStyle, prop.defaultLabelStyle]);
  const allergenStyle = useMemo(() => getTextStyle(prop.allergenStyle, prop.defaultLabelStyle?.allergen), [prop.allergenStyle, prop.defaultLabelStyle]);


  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} fontSize={48} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          <EditableTextareaField 
            name="product_name_en" 
            value={prop.productNameEN} 
            onChange={prop.setProductNameEN}
            style={productNameENStyle} 
            readonly={!isEditedMode}
          />
          <EditableTextareaField 
            name="product_name_zh" 
            value={prop.productNameZH} 
            onChange={prop.setProductNameZH}
            style={productNameZHStyle} 
            readonly={!isEditedMode}
          />
        </div>
      </Header>
      <Ingredients>
        <Col width="auto" justifyContent="space-evenly" height="76px">
        <EditableTextField 
            name="Item_Code" 
            value={prop.itemCode?.toString()} 
            onChange={prop.setItemCode} 
            style={getTextStyle(prop.defaultLabelStyle?.item_code)} 
            readonly={!isEditedMode}
          />
          <EditableTextField 
            name="Customer_Item_Code" 
            value={prop.customerItemCode?.toString()} 
            onChange={prop.setCustomerItemCode} 
            style={getTextStyle(prop.defaultLabelStyle?.item_code)} 
            readonly={!isEditedMode}
          />
        </Col>
        <Col alignItems="flex-start" gap={4}>
        <EditableTextareaField 
            name="ingredient" 
            value={prop.ingredient} 
            onChange={prop.setIngredient}
            style={ingredientStyle} 
            readonly={!isEditedMode}
          />
            <EditableTextareaField 
            name="allergen" 
            value={prop.allergen} 
            onChange={prop.setAllergen}
            style={allergenStyle} 
            readonly={!isEditedMode}
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
            name="weight" 
            value={prop.weight} 
            onChange={prop.setWeight} 
            style={getTextStyle(prop.defaultLabelStyle?.weight)} 
            readonly={!isEditedMode}
          />
          <EditableTextField 
            name="case_quantity" 
            value={prop.caseQuantity?.toString()} 
            onChange={prop.setCaseQuantity} 
            style={getTextStyle(prop.defaultLabelStyle?.case_quantity)} 
            readonly={!isEditedMode}
          />
          <EditableTextField 
            name="case_unit" 
            value={prop.caseUnit} 
            onChange={prop.setCaseUnit} 
            style={getTextStyle(prop.defaultLabelStyle?.case_unit)} 
            readonly={!isEditedMode}
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
          name="lot_number" 
          value={prop.labelInfo.lot_number} 
          onChange={prop.setLotNumber} 
          style={getTextStyle(prop.defaultLabelStyle?.lot_number)} 
          readonly={!isEditedMode}
        />
        <EditableTextField 
          name="status" 
          value={prop.labelInfo.storage} 
          onChange={prop.setStorage} 
          style={storageStyle} 
          readonly={!isEditedMode}
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
                display: "flex",
                alignItems: "center",
                minHeight: 24,
                padding: "0px 0",
                margin: "0",
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
                border: prop.isEditedMode
                  ? prop.showBorder
                    ? "1px solid #bcbcbc80"
                    : "none"
                  : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder=""
              value={""}
              onChange={(e) =>
                prop.setStorage && prop.setStorage(e.target.value)
              }
            />
          </Row>
          <EditableTextareaField 
            name="product_name_en" 
            value={prop.manufacturedFor} 
            onChange={prop.setManufacturedFor}
            style={manufacturedForStyle} 
            readonly={!isEditedMode}
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
