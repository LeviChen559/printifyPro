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
  setManufacturedFor?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufacturedFor?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  storage?: string;
  setStorage?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: Dispatch<SetStateAction<iEditedMode>>;
  logo: string;
  setLogo?: Dispatch<SetStateAction<string>>;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientStyle?: iTextStyle;
  manufacturedForStyle?: iTextStyle;
  storageStyle?: iTextStyle;
  weightUnitStyle?: iTextStyle;
  allergenStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  showBorder: boolean;
}
export const rowHeightConverter = (rows: number) => {
  switch (rows) {
    case 0.25:
      return 22;
    case 0.5:
      return 28;
    case 0.75:
      return 34;
    case 1:
      return 40;
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
    case 3.25:
      return 94;
    case 3.5:
      return 100;
    case 3.75:
      return 106;
    case 4:
      return 112;
    default:
      return 64;
  }
};
export type Ref = HTMLDivElement;
const LabelCard = forwardRef<Ref, iProps>((prop, ref) => {

  console.log("LabelCard", prop.ingredientStyle);

  return prop.type === "4x4_a" ? (
    <LabelCard4_4_a
      labelInfo={prop.labelInput}
      isEditedMode={prop.isEditedMode}
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
      setManufacturedFor={prop.setManufacturedFor}
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      storage={prop.storage}
      setStorage={prop.setStorage}
      manufacturedFor={prop.manufacturedFor}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      allergenStyle={prop.allergenStyle}
      weightStyle={prop.weightStyle}
      ingredientStyle={prop.ingredientStyle}
      manufacturedForStyle={prop.manufacturedForStyle}
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
    isEditedMode={prop.isEditedMode}
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
    setManufacturedFor={prop.setManufacturedFor}
    caseQuantity={prop.caseQuantity}
    setCaseQuantity={prop.setCaseQuantity}
    caseUnit={prop.caseUnit}
    setCaseUnit={prop.setCaseUnit}
    storage={prop.storage}
    setStorage={prop.setStorage}
    manufacturedFor={prop.manufacturedFor}
    defaultLabelStyle={prop.defaultLabelStyle}
    productNameENStyle={prop.productNameENStyle}
    productNameZHStyle={prop.productNameZHStyle}
    allergenStyle={prop.allergenStyle}
    weightStyle={prop.weightStyle}
    ingredientStyle={prop.ingredientStyle}
    manufacturedForStyle={prop.manufacturedForStyle}
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
    isEditedMode={prop.isEditedMode}
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
    setManufacturedFor={prop.setManufacturedFor}
    caseQuantity={prop.caseQuantity}
    setCaseQuantity={prop.setCaseQuantity}
    caseUnit={prop.caseUnit}
    setCaseUnit={prop.setCaseUnit}
    storage={prop.storage}
    setStorage={prop.setStorage}
    manufacturedFor={prop.manufacturedFor}
    defaultLabelStyle={prop.defaultLabelStyle}
    productNameENStyle={prop.productNameENStyle}
    productNameZHStyle={prop.productNameZHStyle}
    allergenStyle={prop.allergenStyle}
    weightStyle={prop.weightStyle}
    ingredientStyle={prop.ingredientStyle}
    manufacturedForStyle={prop.manufacturedForStyle}
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
