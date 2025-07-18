import React, { forwardRef, Dispatch, SetStateAction } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
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
  itemCode?: string;
  lotNumber?: string;
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
  barcode?: string;
  setBarcode?: Dispatch<SetStateAction<string>>;
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
  const isEditedMode = prop.isEditedMode;

  return (
    <Container id="labelCard" ref={ref} width={576}>
      <Header>
        <LabelLogo logo={prop.logo} />
        <EditableTextareaField
          name={iEditedMode.productNameEn}
          value={prop.productNameEN}
          onChange={prop.setProductNameEN}
          style={prop.productNameENStyle}
          readonly={isEditedMode === false}
          rows={prop.productNameENStyle?.rows ?? 2}
          onEditMode={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
          }
          editMode={prop.editMode}
          showBorder={prop.showBorder}
          width={"45%"}
        />
        <EditableTextareaField
          name={iEditedMode.productNameZh}
          value={prop.productNameZH}
          onChange={prop.setProductNameZH}
          style={prop.productNameZHStyle}
          readonly={isEditedMode === false}
          rows={prop.productNameZHStyle?.rows ?? 1}
          onEditMode={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
          }
          editMode={prop.editMode}
          showBorder={prop.showBorder}
          width={"40%"}
        />
      </Header>
      <Ingredients flexDirection="column" gap={6}>
        <Typography variant="body2" width={200} fontWeight={700}>
          For All Ingredients:
        </Typography>
        <EditableTextareaField
          name={iEditedMode.ingredient}
          value={prop.ingredient}
          onChange={prop.setIngredient}
          style={prop.ingredientStyle}
          readonly={isEditedMode === false}
          rows={prop.ingredientStyle?.rows ?? 10}
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
          style={prop.allergenStyle}
          readonly={isEditedMode === false}
          rows={prop.allergenStyle?.rows ?? 1}
          onEditMode={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.allergen)
          }
          editMode={prop.editMode}
          showBorder={prop.showBorder}
        />
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
              readonly={isEditedMode === false}
              width={prop.weight ? autoWidth(prop.weight as string) : 40}
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
              style={prop.defaultText}
              readonly={isEditedMode === false}
              width={prop.caseQuantity ? autoWidth(prop.caseQuantity as number) : 40}
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
              style={prop.defaultText}
              readonly={isEditedMode === false}
              width={prop.caseUnit ? autoWidth(prop.caseUnit as string) : 40}
              height={autoHeight(14)}
              showBorder={prop.showBorder}
              editMode={prop.editMode}
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.caseUnit)
              }
            />
          </Row>
          <Row>
            {prop.showLotNumber && (
              <>
                <Typography
                  variant="body2"
                  width="auto"
                  noWrap
                  fontWeight={700}
                >
                  LOT: #
                </Typography>
                <EditableTextField
                  name={iEditedMode.lotNumber}
                  value={prop.lotNumber}
                  onChange={prop.setLotNumber}
                  style={prop.defaultText}
                  readonly={isEditedMode === false}
                  width={
                    prop.lotNumber ? autoWidth(prop.lotNumber as string) : 40
                  }
                  height={autoHeight(14)}
                  editMode={prop.editMode}
                    onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.lotNumber)
            }
                  minWidth={40}
                />
              </>
            )}
            <EditableTextField
              name={iEditedMode.storage}
              value={prop.storage}
              onChange={prop.setStorage}
              style={prop.storageStyle}
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
          <EditableTextareaField
            name={iEditedMode.manufactured}
            value={prop.manufactured}
            onChange={prop.setManufactured}
            style={prop.manufacturedStyle}
            readonly={isEditedMode === false}
            rows={prop.manufacturedStyle?.rows ?? 1}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.manufactured)
            }
            editMode={prop.editMode}
            showBorder={prop.showBorder}
          />
        </InfomationColumn>
        <InfomationColumn
          flex={1}
          onClick={() =>
            prop.setEditMode && prop.setEditMode(iEditedMode.barcode)
          }
        >
          {/* <Typography variant="body2">BEST BY : {formattedDate}</Typography> */}
          <Barcode
            value={prop.labelInfo.barcode.substring(0, 11) ?? "111111111111"}
            width={2}
            height={58}
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
