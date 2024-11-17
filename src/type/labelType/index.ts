export const enum iEditedMode {
    "productNameEn" = "productNameEn",
    "productNameZh" = "productNameZh",
    "ingredientInfo" = "ingredientInfo",
    "weight" = "weight",
    "manufacturedFor" = "manufacturedFor",
    "weightUnit" = "weightUnit",
    "empty" = "empty",
  }
  
  export const enum iTextStyleMode {
    "fontStyle" = "fontStyle",
    "fontFamily" = "fontFamily",
    "fontWeight" = "fontWeight",
    "fontSize" = "fontSize",
    "color" = "color",
  }
  export interface iTextStyle {
    color: string;
    fontStyle: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
  }
  
  export interface iLabelStyle {
    id: number;
    item_code: string;
    product_name_en: string;
    product_name_zh: string;
    ingredient_info: string;
    weight: string;
    weight_unit: string;
    storage_requirements: string;
    manufactured_for: string;
    case_quantity: string;
    case_unit: string;
    shelf_life: string;
  }

  export interface formState {
    error: boolean;
    message: string;
    locale: string;
  }

  export interface iLabelInfo {
    id: number;
    logo: string;
    item_code: string;
    product_name_en: string;
    product_name_zh: string;
    weight: number;
    weight_unit: string;
    case_quantity: number;
    case_unit: string;
    storage_requirements: string;
    shelf_life: number;
    case_gtin: string;
    ingredient_info: string;
    manufactured_for: string;
    label_size: string;
  }
  export interface iLabelInfoStyle {
    id: number;
    item_code: string;
    product_name_en: string;
    product_name_zh: string;
    weight: number;
    weight_unit: string;
    case_quantity: number;
    case_unit: string;
    storage_requirements: string;
    shelf_life: string;
    case_gtin: string;
    ingredient_info: string;
    manufactured_for: string;
  }