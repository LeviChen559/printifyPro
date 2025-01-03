import React,{ forwardRef,Dispatch,SetStateAction } from "react";
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
  setIngredientInfo?: Dispatch<SetStateAction<string>>;
  ingredientInfo?: string;
  setWeight?: Dispatch<SetStateAction<number>>;
  weight?: number;
  setManufacturedFor?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?:string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufacturedFor?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  storageRequirements?: string;
  setStorageRequirements?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?:Dispatch<SetStateAction<iEditedMode>>;
  logo: string;
  setLogo?: Dispatch<SetStateAction<string>>;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientInfoStyle?: iTextStyle;
  manufacturedForStyle?: iTextStyle;
  storageRequirementsStyle?: iTextStyle;
  weightUnitStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
}

export type Ref = HTMLDivElement;
const LabelCard = forwardRef<Ref, iProps>((prop, ref) => {
  
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
      setIngredientInfo={prop.setIngredientInfo}
      ingredientInfo={prop.ingredientInfo}
      setWeight={prop.setWeight}
      weight={prop.weight}
      setManufacturedFor={prop.setManufacturedFor}
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      storageRequirements={prop.storageRequirements}
      setStorageRequirements={prop.setStorageRequirements}
      manufacturedFor={prop.manufacturedFor}
      setWeightUnit={prop.setWeightUnit}
      weightUnit={prop.weightUnit}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      weightStyle={prop.weightStyle}
      ingredientInfoStyle={prop.ingredientInfoStyle}
      manufacturedForStyle={prop.manufacturedForStyle}
      storageRequirementsStyle={prop.storageRequirementsStyle}
      weightUnitStyle={prop.weightUnitStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}
      
    />
  ) : prop.type === "4x6_a" ? (
    <LabelCard4_6_a
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
      caseQuantity={prop.caseQuantity}
      setCaseQuantity={prop.setCaseQuantity}
      caseUnit={prop.caseUnit}
      setCaseUnit={prop.setCaseUnit}
      defaultLabelStyle={prop.defaultLabelStyle}
      productNameENStyle={prop.productNameENStyle}
      productNameZHStyle={prop.productNameZHStyle}
      weightStyle={prop.weightStyle}
      ingredientInfoStyle={prop.ingredientInfoStyle}
      manufacturedForStyle={prop.manufacturedForStyle}
      storageRequirementsStyle={prop.storageRequirementsStyle}
      weightUnitStyle={prop.weightUnitStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}
   

    />
  ) :  (
    <LabelCard4_4_b
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
      weightStyle={prop.weightStyle}
      ingredientInfoStyle={prop.ingredientInfoStyle}
      manufacturedForStyle={prop.manufacturedForStyle}
      storageRequirementsStyle={prop.storageRequirementsStyle}
      weightUnitStyle={prop.weightUnitStyle}
      editMode={prop.editMode}
      setEditMode={prop.setEditMode}
      logo={prop.logo}
      ref={ref}

    />
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
