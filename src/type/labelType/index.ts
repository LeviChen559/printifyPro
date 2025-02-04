export const enum iEditedMode {
    "productNameEn" = "productNameEn",
    "productNameZh" = "productNameZh",
    "ingredient" = "ingredient",
    "weight" = "weight",
    "caseQuantity" = "caseQuantity",
    "manufacturedFor" = "manufacturedFor",
    "customerCode" = "customerCode",
    "itemCode" = "itemCode",
    "caseUnit" = "caseUnit",
    "storage" = "storage",
    "allergen"="allergen",
    "lotNumber"="lotNumber",
    "bestBefore"="bestBefore",
    "cardComponent"="cardComponent",
    "stylePannel"="stylePannel",
    "empty" = "empty",
  }
  
  export const enum iTextStyleMode {
    "fontStyle" = "fontStyle",
    "fontFamily" = "fontFamily",
    "fontWeight" = "fontWeight",
    "fontSize" = "fontSize",
    "color" = "color",
    "rows" = "rows",
    "lineHeight" = "lineHeight",
  }
  export interface iTextStyle {
    color: string;
    fontStyle: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    rows?: number;
    lineHeight?: number;
  }
  
  export interface iLabelStyle {
    id: number;
    item_code: iTextStyle;
    customer_item_code: iTextStyle;
    lot_number: iTextStyle;
    product_name_en: iTextStyle;
    product_name_zh: iTextStyle;
    ingredient: iTextStyle;
    weight: iTextStyle;
    storage: iTextStyle;
    manufactured: iTextStyle;
    case_quantity: iTextStyle;
    case_unit: iTextStyle;
    shelf_life: iTextStyle;
    allergen: iTextStyle;
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
    customer_item_code: string;
    lot_number: string;
    product_name_en: string;
    product_name_zh: string;
    weight: string;
    case_quantity: number;
    case_unit: string;
    storage: string;
    shelf_life: string;
    case_gtin: string;
    ingredient: string;
    manufactured: string;
    label_temp: string;
    allergen: string;
  }
  export interface iLabelInfoStyle {
    id: number;
    item_code: string;
    custom_item_code: string;
    lot_number: string;
    product_name_en: string;
    product_name_zh: string;
    weight: number;
    case_quantity: number;
    case_unit: string;
    storage: string;
    shelf_life: string;
    case_gtin: string;
    ingredient: string;
    manufactured: string;
  }