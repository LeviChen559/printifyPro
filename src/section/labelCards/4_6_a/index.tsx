import React, { forwardRef, Dispatch, SetStateAction } from "react";
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
import "react-edit-text/dist/index.css";
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";
import EditableTextareaField from "@/components/editableTextareaField";
import EditableTextField from "@/components/editableTextField";
interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  itemCode?: string;
  lotNumber?:string
  storage?: string;
  setLotNumber?: Dispatch<SetStateAction<string>>;
  setItemCode?: Dispatch<SetStateAction<string>>;
  ref: React.RefObject<HTMLDivElement> | undefined;
  setProductNameEN?: Dispatch<SetStateAction<string>>;
  setProductNameZH?: Dispatch<SetStateAction<string>>;
  productNameEN?: string;
  productNameZH?: string;
  setIngredient?: Dispatch<SetStateAction<string>>;
  ingredient?: string;
  setWeight?: Dispatch<SetStateAction<string>>;
  weight?: string;
  setManufactured?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufactured?: string;
  setStorage?: Dispatch<SetStateAction<string>>;
  allergen?: string;
  setAllergen?: Dispatch<SetStateAction<string>>;
  editMode: iEditedMode;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  defaultText?: iTextStyle;
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
  const isEditedMode = prop.isEditedMode;

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo}  />
        <EditableTextareaField
            name={iEditedMode.productNameEn}
            value={prop.productNameEN}
            onChange={prop.setProductNameEN}
            style={prop.productNameENStyle}
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
            style={prop.productNameZHStyle}
            readonly={!isEditedMode}
            rows={prop.productNameZHStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
      </Header>
      <Ingredients>
        <Typography width={"100%"}>Ingredients:</Typography>
        <div style={{ width: "100%", overflow: "hidden", height: "100%" }}>
        <EditableTextareaField
            name={iEditedMode.ingredient}
            value={prop.ingredient}
            onChange={prop.setIngredient}
            style={prop.ingredientStyle}
            readonly={!isEditedMode}
            rows={prop.ingredientStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredient)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
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
            <EditableTextField
            name={iEditedMode.weight}
            value={prop.weight}
            onChange={prop.setWeight}
            style={prop.defaultText}
            readonly={!isEditedMode}
            width={75}
            height={24}
            showBorder={prop.showBorder}
          />
           <EditableTextField
            name={iEditedMode.caseQuantity}
            value={prop.caseQuantity}
            onChange={prop.setCaseQuantity}
            style={prop.defaultText}
            readonly={!isEditedMode}
            width={30}
            height={24}
            showBorder={prop.showBorder}
          />
          <EditableTextField
            name={iEditedMode.caseUnit}
            value={prop.caseUnit}
            onChange={prop.setCaseUnit}
            style={prop.defaultText}
            readonly={!isEditedMode}
            width={60}
            height={24}
            showBorder={prop.showBorder}
          />
          </Row>
          <Row>
            <Typography variant="body2" noWrap>
              Storage Requirements :
            </Typography>
            <EditableTextField
          name={iEditedMode.storage}
          value={prop.storage}
          onChange={prop.setStorage}
          style={prop.storageStyle}
          readonly={!isEditedMode}
          width={120}
          height={24}
          showBorder={prop.showBorder}
        />
          </Row>
          <Typography variant="body2">Manufactured For:</Typography>
          <div style={{ width: "100%", height: 44 }}>
          <EditableTextareaField
            name={iEditedMode.manufactured}
            value={prop.manufactured}
            onChange={prop.setManufactured}
            style={prop.manufacturedStyle}
            readonly={!isEditedMode}
            rows={prop.manufacturedStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.manufactured)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
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
