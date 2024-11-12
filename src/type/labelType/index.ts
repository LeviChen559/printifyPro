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
  
  export interface ILabelStyle {
    id: number;
    item_code: iTextStyle;
    product_name_en: iTextStyle;
    product_name_zh: iTextStyle;
    ingredient_info: iTextStyle;
    weight: iTextStyle;
    weight_unit: iTextStyle;
    storage_requirements: iTextStyle;
    manufactured_for: iTextStyle;
    case_quantity: iTextStyle;
    case_unit: iTextStyle;
    shelf_life: iTextStyle;
  }