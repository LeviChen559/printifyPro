import React from "react";
import LabelCard4_4 from "@/section/labelCard/4_4";
import LabelCard4_6 from "@/section/labelCard/4_6";
import LabelCard4_8 from "@/section/labelCard/4_8";
import {
  iLabelInfo,
  iTextStyle,
  iLabelStyle,
  iEditedMode,
} from "@/type/labelType";

interface iProps {
  type: string;
  labelInput: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement>;
  setProductNameEN?: (value: string) => void;
  setProductNameZH?: (value: string) => void;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: (value: string) => void;
  ingredientInfo?: string;
  setWeight?: (value: number) => void;
  weight?: number;
  setManufacturedFor?: (value: string) => void;
  manufacturedFor?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  setStorageRequirements?: (value: string) => void;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  logo: string;
  setLogo?: React.Dispatch<React.SetStateAction<string>>;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
}
const LabelCard = (prop:iProps) => {
  return prop.type === "4x4" ? (
    <LabelCard4_4
      labelInfo={prop.labelInput}
      isEditedMode={prop.isEditedMode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredientInfo={prop.setIngredientInfo}
      ingredientInfo={prop.ingredientInfo}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufacturedFor={prop.setManufacturedFor}
      setStorageRequirements={prop.setStorageRequirements}
      manufacturedFor={prop.manufacturedFor}
      setWeightUnit={prop.setWeightUnit}
      weightUnit={prop.weightUnit}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={prop.ref}
    />
  ) : prop.type === "4x6" ? (
    <LabelCard4_6
      labelInfo={prop.labelInput}
      isEditedMode={prop.isEditedMode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredientInfo={prop.setIngredientInfo}
      ingredientInfo={prop.ingredientInfo}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufacturedFor={prop.setManufacturedFor}
      setStorageRequirements={prop.setStorageRequirements}
      manufacturedFor={prop.manufacturedFor}
      setWeightUnit={prop.setWeightUnit}
      weightUnit={prop.weightUnit}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={prop.ref}

    />
  ) :  (
    <LabelCard4_8
      labelInfo={prop.labelInput}
      isEditedMode={prop.isEditedMode}
      setProductNameEN={prop.setProductNameEN}
      setProductNameZH={prop.setProductNameZH}
      productNameEN={prop.productNameEN}
      productNameZH={prop.productNameZH}
      setIngredientInfo={prop.setIngredientInfo}
      ingredientInfo={prop.ingredientInfo}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufacturedFor={prop.setManufacturedFor}
      setStorageRequirements={prop.setStorageRequirements}
      manufacturedFor={prop.manufacturedFor}
      setWeightUnit={prop.setWeightUnit}
      weightUnit={prop.weightUnit}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={prop.ref}

    />
  ) 
};

export default LabelCard;
