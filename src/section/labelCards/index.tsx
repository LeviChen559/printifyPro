import React, { forwardRef, Dispatch, SetStateAction, useEffect } from "react";
import LabelCard_sm_a from "@/section/labelCards/sm_a";
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
  storage_1st?: string;
  setStorage_1st?: Dispatch<SetStateAction<string>>;
  storage_2nd?: string;
  setStorage_2nd?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode: iEditedMode;
  setEditMode?: Dispatch<SetStateAction<iEditedMode>>;
  logo: string;
  barcode: string;
  setBarcode?: Dispatch<SetStateAction<string>>;
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
  showLotNumber?: boolean;
}

export type Ref = HTMLDivElement;
const LabelCard = forwardRef<Ref, iProps>((prop, ref) => {
  const [bestBefore, setBestBefore] = React.useState<string>("");

  useEffect(() => {
    const shelfLife_1st = prop.labelInput.shelf_life_1st;
    const shelfLife_2nd = prop.labelInput.shelf_life_2nd;
    const shelfLife = shelfLife_1st ? `${shelfLife_1st} days` : shelfLife_2nd ? `${shelfLife_2nd} days` : "";
    const getShelfDays = (shelfLife: string): number | null => {
      if (!shelfLife) return null;

      if (shelfLife.includes("/")) {
        const days = Number(shelfLife.split("/")[0].trim());
        return isNaN(days) ? null : days;
      }

      if (shelfLife.toLowerCase().includes("days")) {
        const num = parseInt(
          shelfLife.toLowerCase().replace("days", "").trim(),
          10
        );
        return isNaN(num) ? null : num;
      }

      return null;
    };

    const shelfDays = getShelfDays(shelfLife);
    if (typeof shelfDays === "number") {
      const today = new Date();
      today.setDate(today.getDate() + shelfDays);
      setBestBefore(today.toLocaleDateString());
    } else {
      setBestBefore("");
    }
  }, [prop.labelInput.shelf_life_1st, prop.labelInput.shelf_life_2nd]);

useEffect(() => {
  if (!prop.lotNumber) {
    const date = new Date();
    date.setDate(date.getDate() + 1); // tomorrow

    // Compute day of the year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Format as YYDDD
    const yy = String(date.getFullYear()).slice(-2);
    const ddd = String(dayOfYear).padStart(3, '0');
    const julian5 = yy + ddd;

    if (prop.setLotNumber) {
      prop.setLotNumber(julian5);
    }
  }
}, [prop.lotNumber, prop.setLotNumber]);

  return prop.type === "sm_a" ? (
    <LabelCard_sm_a
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
      // storage_1st={prop.storage_1st}
      // setStorage_1st={prop.setStorage_1st}
      // storage_2nd={prop.storage_2nd}
      // setStorage_2nd={prop.setStorage_2nd}
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
      showLotNumber={prop.showLotNumber ?? true}
      bestBefore={bestBefore}
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
      // storage={prop.storage}
      // setStorage={prop.setStorage}
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
      showLotNumber={prop.showLotNumber ?? true}
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
      // storage={prop.storage}
      // setStorage={prop.setStorage}
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
      showLotNumber={prop.showLotNumber ?? true}
    />
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
