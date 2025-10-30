import React, { forwardRef, Dispatch, SetStateAction, useEffect } from "react";
import LabelCard_sm_a from "@/section/labelCards/sm_a";
import LabelCard_sm_b from "@/section/labelCards/sm_b";
import LabelCard4_6_a from "@/section/labelCards/4_6_a";

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
  lotNumberType?: string;
  setLotNumber?: Dispatch<SetStateAction<string>>;
  setLotNumberType?: Dispatch<SetStateAction<string>>;
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
  displayStorage?:string
  isPrintedView?: boolean;
  
}

export type Ref = HTMLDivElement;
const LabelCard = forwardRef<Ref, iProps>((prop, ref) => {
  const [bestBefore, setBestBefore] = React.useState<string>("");
  const [bestBefore2, setBestBefore2] = React.useState<string>("");

useEffect(() => {
  const sf1 = prop.labelInput.shelf_life_1st;
  const sf2 = prop.labelInput.shelf_life_2nd;
  console.log("raw shelf life inputs:", { sf1, sf2 });

  const shelfLife1 = sf1 !== null && sf1 !== undefined ? `${sf1} days` : "";
  const shelfLife2 = sf2 !== null && sf2 !== undefined ? `${sf2} days` : "";

  const getShelfDays = (shelfLife: string): number | null => {
    if (!shelfLife) return null;
    if (shelfLife.includes("/")) {
      const days = Number(shelfLife.split("/")[0].trim());
      return Number.isFinite(days) ? days : null;
    }
    if (shelfLife.toLowerCase().includes("days")) {
      const num = parseInt(shelfLife.toLowerCase().replace("days", "").trim(), 10);
      return Number.isFinite(num) ? num : null;
    }
    return null;
  };

  const shelfDays1 = getShelfDays(shelfLife1);
  const shelfDays2 = getShelfDays(shelfLife2);
  console.log("parsed shelfDays:", { shelfDays1, shelfDays2 });

  if (typeof shelfDays1 === "number") {
    const d = new Date();
    d.setDate(d.getDate() + shelfDays1);
    const dateStr = d.toLocaleDateString();
    console.log("setting bestBefore ->", dateStr);
    setBestBefore(dateStr);
  } else {
    console.log("clearing bestBefore");
    setBestBefore("");
  }

  if (typeof shelfDays2 === "number") {
    const d2 = new Date();
    d2.setDate(d2.getDate() + shelfDays2);
    const dateStr2 = d2.toLocaleDateString();
    console.log("setting bestBefore2 ->", dateStr2);
    setBestBefore2(dateStr2);
  } else {
    console.log("clearing bestBefore2");
    setBestBefore2("");
  }
}, [prop.labelInput.shelf_life_1st, prop.labelInput.shelf_life_2nd]);



  useEffect(() => {
    if (!prop.setLotNumber) return;

    if (!prop.lotNumber && prop.lotNumberType === "auto") {
      const date = new Date();
      date.setDate(date.getDate() + 1); // tomorrow

      // Compute day of the year (cleaner version)
      const start = new Date(date.getFullYear(), 0, 1);
      const diff = date.getTime() - start.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

      // Format as YYDDD
      const yy = String(date.getFullYear()).slice(-2);
      const ddd = String(dayOfYear).padStart(3, "0");
      const julian5 = yy + ddd;

      prop.setLotNumber(julian5);
    }
  }, [prop.lotNumberType,prop]);


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
      storage_1st={prop.storage_1st}
      storage_2nd={prop.storage_2nd}
      manufactured={prop.manufactured}
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
      bestBefore2={bestBefore2}
      displayStorage={prop.displayStorage}
      isPrintedView={prop.isPrintedView}
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
    <LabelCard_sm_b
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
      storage_1st={prop.storage_1st}
      storage_2nd={prop.storage_2nd}
      // setStorage_1st={prop.setStorage_1st}
      // setStorage_2nd={prop.setStorage_2nd}
      manufactured={prop.manufactured}
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
      bestBefore2={bestBefore2}
    />
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
