import React, { forwardRef, Dispatch, SetStateAction } from "react";
import LabelCard4_4_a from "@/section/labelCards/4_4_a";
import LabelCard4_6_a from "@/section/labelCards/4_6_a";
import LabelCard4_4_b from "@/section/labelCards/4_4_b";
import {
  iLabelInfo,
  iTextStyle,
  iLabelStyle,
  iEditedMode,
} from "@/type/labelType";

interface iProps {
  type: string;
  labelInput: iLabelInfo;
  itemCode?: string;
  setItemCode?: Dispatch<SetStateAction<string>>;
  customerItemCode?: string;
  setCustomerItemCode?: Dispatch<SetStateAction<string>>;
  lotNumber?: string;
  setLotNumber?: Dispatch<SetStateAction<string>>;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement>;
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
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufactured?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  storage?: string;
  setStorage?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode: iEditedMode;
  setEditMode?: Dispatch<SetStateAction<iEditedMode>>;
  logo: string;
  barcode: string;
  setBarcode: Dispatch<SetStateAction<string>>;
  setLogo?: Dispatch<SetStateAction<string>>;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  defaultText: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  allergenStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  showBorder: boolean;
}

export type Ref = HTMLDivElement;
const LabelCard = forwardRef<Ref, iProps>((prop, ref) => {
  return prop.type === "4x4_a" ? (
    <LabelCard4_4_a
      labelInfo={prop.labelInput}
      itemCode={prop.itemCode}
      customerItemCode={prop.customerItemCode}
      setCustomerItemCode={prop.setCustomerItemCode}
      lotNumber={prop.lotNumber}
      setLotNumber={prop.setLotNumber}
      setItemCode={prop.setItemCode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredient={prop.setIngredient}
      ingredient={prop.ingredient}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufactured={prop.setManufactured}
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      storage={prop.storage}
      setStorage={prop.setStorage}
      manufactured={prop.manufactured}
      barcode={prop.barcode}
      setBarcode={prop.setBarcode}
      defaultLabelStyle={prop.defaultLabelStyle}
      defaultText={prop.defaultText}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      allergenStyle={prop.allergenStyle}
      ingredientStyle={prop.ingredientStyle}
      manufacturedStyle={prop.manufacturedStyle}
      storageStyle={prop.storageStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}
      allergen={prop.allergen}
      setAllergen={prop.setAllergen}
      showBorder={prop.showBorder}
    />
  ) : prop.type === "4x6_a" ? (
    <LabelCard4_6_a
      labelInfo={prop.labelInput}
      itemCode={prop.itemCode}
      lotNumber={prop.lotNumber}
      setLotNumber={prop.setLotNumber}
      setItemCode={prop.setItemCode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredient={prop.setIngredient}
      ingredient={prop.ingredient}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufactured={prop.setManufactured}
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      storage={prop.storage}
      setStorage={prop.setStorage}
      manufactured={prop.manufactured}
      barcode={prop.barcode}
      setBarcode={prop.setBarcode}
      defaultLabelStyle={prop.defaultLabelStyle}
      defaultText={prop.defaultText}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      allergenStyle={prop.allergenStyle}
      ingredientStyle={prop.ingredientStyle}
      manufacturedStyle={prop.manufacturedStyle}
      storageStyle={prop.storageStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}
      allergen={prop.allergen}
      setAllergen={prop.setAllergen}
      showBorder={prop.showBorder}
    />
  ) : (
    <LabelCard4_4_b
      labelInfo={prop.labelInput}
      itemCode={prop.itemCode}
      customerItemCode={prop.customerItemCode}
      setCustomerItemCode={prop.setCustomerItemCode}
      lotNumber={prop.lotNumber}
      setLotNumber={prop.setLotNumber}
      setItemCode={prop.setItemCode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredient={prop.setIngredient}
      ingredient={prop.ingredient}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufactured={prop.setManufactured}
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      storage={prop.storage}
      setStorage={prop.setStorage}
      manufactured={prop.manufactured}
      barcode={prop.barcode}
      setBarcode={prop.setBarcode}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      allergenStyle={prop.allergenStyle}
      defaultText={prop.defaultText}
      ingredientStyle={prop.ingredientStyle}
      manufacturedStyle={prop.manufacturedStyle}
      storageStyle={prop.storageStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}
      allergen={prop.allergen}
      setAllergen={prop.setAllergen}
      showBorder={prop.showBorder}
    />
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
