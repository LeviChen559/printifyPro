"use client";
import React, { FC, useState, useRef, useEffect, useReducer } from "react";
import { Container, View, Print } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo, iLabelStyleInDataBase } from "@/type/labelType";
import LabelCard from "@/section/labelCards";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import LottieAnimation from "@/components/lottie/send";
import AnimationJson from "@/components/lottie/delete.json";
import StylePanel from "@/components/stylePanel";
import useSWR from "swr";
import {
  iTextStyle,
  iEditedMode,
  iLabelStyle,
  iTextStyleMode,
  formState,
} from "@/type/labelType";
import LabelForm from "@/section/labelForm";
import { fetcher } from "@/utils/lib/fetcher";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { reducer, handleUpdate, handleNumberUpdate } from "@/store/formStore";

interface iProps {
  selectLabelInfo: iLabelInfo;
  setShowCard: React.Dispatch<
    React.SetStateAction<{
      labelActionCard: boolean;
      labelPrintCard: boolean;
      labelEditCard: boolean;
      isLabelUpdated: boolean;
    }>
  >;
  userName: string;
  userRole: string;
  defaultText: iTextStyle;
  editMode: iEditedMode;
  setEditMode: React.Dispatch<React.SetStateAction<iEditedMode>>;
}

const LabelEditCard: FC<iProps> = (prop) => {
  const { data: labelStyle, error } = useSWR(
    `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`,
    fetcher
  );

  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const stylePannelRef = useRef<HTMLDivElement>(null);
  const [isLabelUpdating, setIsLabelUpdating] = useState<boolean>(false);
  const [isLabelDeleted, setIsLabelDeleted] = useState<boolean>(false);
  const [labelState, dispatch] = useReducer(reducer, prop.selectLabelInfo);

  const baseTextStyle: iTextStyle = {
    color: "#000000",
    fontStyle: "Normal",
    fontFamily: "Arial",
    fontWeight: 400,
    rows: 1,
    lineHeight: 1.2,
    fontSize: 14,
  };

  const styleForBody: iTextStyle = {
    ...baseTextStyle,
    fontSize: 14,
  };

  const styleForHeader: iTextStyle = {
    ...baseTextStyle,
    fontSize: 24,
    fontWeight: 700,
  };

  const [productNameENStyle, setProductNameENStyle] =
    useState<iTextStyle>(styleForHeader);
  const [productNameZHStyle, setProductNameZHStyle] =
    useState<iTextStyle>(styleForHeader);
  const [weightStyle, setWeightStyle] = useState<iTextStyle>(styleForBody);
  const [storageStyle, setStorageStyle] = useState<iTextStyle>(styleForBody);
  const [allergenStyle, setAllergenStyle] = useState<iTextStyle>(styleForBody);
  const [ingredientStyle, setIngredientStyle] =
    useState<iTextStyle>(styleForBody);
  const [manufacturedStyle, setManufacturedStyle] =
    useState<iTextStyle>(styleForBody);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [formError, setFormError] = useState<formState>({
    error: false,
    message: "",
    locale: "",
  });
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const labelInput = {
    id: prop.selectLabelInfo.id,
    logo: labelState.logo,
    item_code: labelState.item_code, // Add appropriate value
    customer_item_code: labelState.customer_item_code,
    lot_number: labelState.lot_number, // Add appropriate value
    lot_number_type: labelState.lot_number_type,
    product_name_en: labelState.product_name_en,
    product_name_zh: labelState.product_name_zh,
    weight: labelState.weight,
    case_quantity: labelState.case_quantity,
    case_unit: labelState.case_unit,
    storage_1st: labelState.storage_1st,
    storage_2nd: labelState.storage_2nd,
    shelf_life_1st: labelState.shelf_life_1st,
    shelf_life_2nd: labelState.shelf_life_2nd,
    case_gtin: labelState.case_gtin,
    ingredient: labelState.ingredient,
    manufactured: labelState.manufactured,
    label_temp: labelState.label_temp,
    allergen: labelState.allergen,
    barcode: labelState.barcode,
  };

  useEffect(() => {
    // List of fields to check
    if (!submitClicked) return;
    const validations = [
      {
        field: labelState.item_code,
        message: "Item code is required",
        locale: "item_code",
      },
      {
        field: labelState.product_name_en,
        message: "Product Name (English) is required",
        locale: "product_name_en",
      },
      {
        field: labelState.product_name_zh,
        message: "Product Name (Chinese) is required",
        locale: "product_name_zh",
      },
      {
        field: labelState.weight,
        message: "Net Weight is required",
        locale: "weight",
      },
      {
        field: labelState.case_quantity,
        message: "Case Quantity is required",
        locale: "case_quantity",
      },
      {
        field: labelState.case_unit,
        message: "Case Unit is required",
        locale: "case_unit",
      },
      {
        field: labelState.storage_1st,
        message: "Storage Requirements 1st is required",
        locale: "storage_1st",
      },
      {
        field: labelState.shelf_life_1st,
        message: "Shelf Life is required",
        locale: "shelf_life",
      },
      {
        field: labelState.allergen,
        message: "Allergen is required",
        locale: "Allergen",
      },
      {
        field: labelState.ingredient,
        message: "Ingredient Info is required",
        locale: "ingredient",
      },
      {
        field: labelState.manufactured,
        message: "Manufactured For is required",
        locale: "manufactured",
      },
      {
        field: labelState.barcode,
        message: "Barcode For is required",
        locale: "barcode",
        validate: (value: string) => value?.length === 12,
      },
      {
        field: labelState.case_gtin,
        message: "Case GTIN is required and must be 12 characters",
        locale: "case_gtin",
        validate: (value: string) => value?.length === 12,
      },
      {
        field: labelState.lot_number,
        message: "Lot Number is required",
        locale: "lot_number",
        validate: (value: string) => value?.length > 0 || value === "",
      },
    ];

    // Loop through each validation rule
    for (const { field, message, locale, validate } of validations) {
      if (!field || (validate && !validate(field))) {
        setFormError({
          error: true,
          message,
          locale,
        });
        return; // stop here if validation fails
      }
    }

    // If no errors were found, clear formError
    setFormError({
      error: false,
      message: "",
      locale: "",
    });
  }, [
    labelState.item_code,
    labelState.product_name_en,
    labelState.product_name_zh,
    labelState.weight,
    labelState.case_quantity,
    labelState.case_unit,
    labelState.storage_1st,
    labelState.storage_2nd,
    labelState.shelf_life_1st,
    labelState.shelf_life_2nd,
    labelState.case_gtin,
    labelState.ingredient,
    labelState.manufactured,
    submitClicked,
    labelState.allergen,
    labelState.barcode,
    labelState.lot_number,
    labelState.lot_number_type,
  ]);

  const handleItemCodeChange = handleUpdate(
    "item_code",
    dispatch,
    labelState.item_code
  );
  const handleCustomerItemCodeChange = handleUpdate(
    "customer_item_code",
    dispatch,
    labelState.customer_item_code
  );
  const handleProductNameENChange = handleUpdate(
    "product_name_en",
    dispatch,
    labelState.product_name_en
  );
  const handleProductNameZHChange = handleUpdate(
    "product_name_zh",
    dispatch,
    labelState.product_name_zh
  );
  const handleWeightChange = handleUpdate(
    "weight",
    dispatch,
    labelState.weight
  );
  const handleCaseQuantityChange = handleNumberUpdate(
    "case_quantity",
    dispatch,
    labelState.case_quantity
  );
  const handleCaseUnitChange = handleUpdate(
    "case_unit",
    dispatch,
    labelState.case_unit
  );
  const handleStorage1stChange = handleUpdate(
    "storage_1st",
    dispatch,
    labelState.storage_1st
  );
  const handleStorage2ndChange = handleUpdate(
    "storage_2nd",
    dispatch,
    labelState.storage_2nd
  );
  const handleShelfLife1stChange = handleNumberUpdate(
    "shelf_life_1st",
    dispatch,
    labelState.shelf_life_1st
  );
  const handleShelfLife2ndChange = handleNumberUpdate(
    "shelf_life_2nd",
    dispatch,
    labelState.shelf_life_2nd
  );
  const handleCaseGtinChange = handleUpdate(
    "case_gtin",
    dispatch,
    labelState.case_gtin
  );
  const handleIngredientChange = handleUpdate(
    "ingredient",
    dispatch,
    labelState.ingredient
  );
  const handleAllergenChange = handleUpdate(
    "allergen",
    dispatch,
    labelState.allergen
  );
  const handleManufacturedChange = handleUpdate(
    "manufactured",
    dispatch,
    labelState.manufactured
  );
  const handleBarcodeChange = handleUpdate(
    "barcode",
    dispatch,
    labelState.barcode
  );
  const handleLogoChange = handleUpdate("logo", dispatch, labelState.logo);
  const handleLabelTempChange = handleUpdate(
    "label_temp",
    dispatch,
    labelState.label_temp
  );
  const handleLotNumberChange = handleUpdate(
    "lot_number",
    dispatch,
    labelState.lot_number
  );
  const handleLotNumberTypeChange = handleUpdate(
    "lot_number_type",
    dispatch,
    labelState.lot_number_type
  );

  useEffect(() => {
    if (labelStyle?.data?.[0]) {
      const fields = [
        { key: "product_name_en", setter: setProductNameENStyle },
        { key: "product_name_zh", setter: setProductNameZHStyle },
        { key: "weight", setter: setWeightStyle },
        { key: "ingredient", setter: setIngredientStyle },
        { key: "manufactured", setter: setManufacturedStyle },
        { key: "storage", setter: setStorageStyle },
        { key: "allergen", setter: setAllergenStyle },
      ];

      const safeParse = (value: unknown) => {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      };

      fields.forEach(({ key, setter }) => {
        const styleObj = safeParse(labelStyle.data[0][key]);
        setter((prevStyle: iTextStyle) => ({
          ...prevStyle,
          ...styleObj,
        }));
      });
    }
  }, [labelStyle]);

  const labelStyleuUpdates: iLabelStyleInDataBase = {
    id: prop.selectLabelInfo.id,
    item_code: labelStyle ? labelStyle.data[0]?.item_code : prop.defaultText,
    customer_item_code: labelStyle
      ? labelStyle.data[0]?.customer_item_code
      : prop.defaultText,
    lot_number: labelStyle ? labelStyle.data[0]?.lot_number : prop.defaultText,
    product_name_en: JSON.stringify(productNameENStyle),
    product_name_zh: JSON.stringify(productNameZHStyle),
    ingredient: JSON.stringify(ingredientStyle),
    weight: labelStyle ? labelStyle.data[0]?.weight : prop.defaultText,
    storage: JSON.stringify(storageStyle),
    manufactured: JSON.stringify(manufacturedStyle),
    case_quantity: labelStyle
      ? labelStyle.data[0]?.case_quantity
      : prop.defaultText,
    case_unit: labelStyle ? labelStyle.data[0]?.case_unit : prop.defaultText,
    shelf_life: labelStyle ? labelStyle.data[0]?.shelf_life : prop.defaultText,
    allergen: JSON.stringify(allergenStyle),
  };

  const updateLabel = async (
    labelInfo: iLabelInfo,
    labelStyle: iLabelStyleInDataBase
  ) => {
    setSubmitClicked(true);
    setIsLabelUpdating(true);
    try {
      const res = await axios.patch("/api/prisma/updateLabel", {
        labelInfo,
        labelStyle,
      });
      if (res.data.success) {
        setIsLabelUpdating(true);
        try {
          const res = await axios.post("/api/prisma/addNewActive", {
            event: "update label",
            username: prop.userName,
            role: prop.userRole,
            label_code: labelInfo.item_code,
          });
          console.log("Response from server2:", res);
          if (res.status === 200) {
            // Handle successful response, e.g., update state/UI or show confirmation
            console.log("Label updated successfully", res.data);
          }
        } catch (error) {
          console.error("Error updating label:", error);
          // Optionally display error feedback to the user
        }
        setTimeout(() => {
          setIsLabelUpdating(false);
          prop.setShowCard(() => ({
            labelActionCard: false,
            labelPrintCard: false,
            labelEditCard: false,
            labelDuplicateCard: false,
            isLabelUpdated: true,
          }));
          router.push("/dashboard/mylabels");
        }, 1000);
      } else {
        console.error("Update failed:", res.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating label:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Error updating label:", error);
      }
    } finally {
      setIsLabelUpdating(false);
    }
  };
const deleteLabel = async (labelId: number) => {
  try {
    const res = await axios.delete("/api/prisma/deleteLabel", {
      data: { id: labelId },
    });

    if (res.data.success) {
      setIsLabelDeleted(true);

      try {
        await axios.post("/api/prisma/addNewActive", {
          event: "delete label",
          username: prop.userName,
          role: prop.userRole,
          label_code: labelState.item_code,
          created_at: new Date(),
        });
      } catch (logError) {
        console.error("Error logging delete event:", logError);
      }

      setTimeout(() => {
        setIsLabelDeleted(false);
        prop.setShowCard({
          labelActionCard: false,
          labelPrintCard: false,
          labelEditCard: false,
          isLabelUpdated: true,
        });
        router.push("/dashboard/mylabels");
      }, 3000);
    }
  } catch (error) {
    console.error("Error deleting label:", error);
  }
};

  const styleSetters: Partial<
    Record<iEditedMode, React.Dispatch<React.SetStateAction<iTextStyle>>>
  > = {
    [iEditedMode.productNameEn]: setProductNameENStyle,
    [iEditedMode.productNameZh]: setProductNameZHStyle,
    [iEditedMode.weight]: setWeightStyle,
    [iEditedMode.ingredient]: setIngredientStyle,
    [iEditedMode.storage]: setStorageStyle,
    [iEditedMode.manufactured]: setManufacturedStyle,
    [iEditedMode.allergen]: setAllergenStyle,
    // Add more if needed
  };

  const numberFields = [
    iTextStyleMode.fontSize,
    iTextStyleMode.fontWeight,
    iTextStyleMode.rows,
    iTextStyleMode.lineHeight,
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataType: iEditedMode,
    styleType: iTextStyleMode
  ) => {
    const setter = styleSetters[dataType];
    if (!setter) return;
    const value = numberFields.includes(styleType)
      ? Number(event.target.value)
      : event.target.value;
    setter((prevStyle) => ({
      ...prevStyle,
      [styleType]: value,
    }));
  };

  useEffect(() => {
    if (!contentRef.current || !stylePannelRef.current) return; // ✅ Prevent running if refs are not ready

    const handleModalClick = (event: MouseEvent) => {
      const isInside = [contentRef, stylePannelRef].some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );

      if (!isInside) {
        console.log("Click outside");
        prop.setEditMode(iEditedMode.empty);
      } else {
        console.log("Click inside");
      }
    };

    document.addEventListener("mousedown", handleModalClick);

    return () => {
      document.removeEventListener("mousedown", handleModalClick);
    };
  }, [contentRef, stylePannelRef, prop.editMode, prop]); // ✅ Use `.current` in dependencies

  if (isLabelDeleted) {
    return (
      <Container>
        <LottieAnimation
          text="Label is Deleted!"
          animationUrl={AnimationJson}
        />
      </Container>
    );
  }
  if (error) {
    console.error("Failed to fetch label style:", error);
  }
  if (labelStyle === undefined || !Array.isArray(labelStyle.data)) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <CancelRoundedIcon
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          "&:hover": {
            cursor: "pointer",
            color: "#bcbcbc",
          },
        }}
        onClick={() =>
          prop.setShowCard(() => ({
            labelActionCard: false,
            labelPrintCard: false,
            labelEditCard: false,
            labelDuplicateCard: false,
            isLabelUpdated: false,
          }))
        }
      />
      <View>
        <StylePanel
          ref={stylePannelRef}
          isEditMode={prop.editMode}
          productNameENStyle={productNameENStyle}
          productNameZHStyle={productNameZHStyle}
          weightStyle={weightStyle}
          ingredientStyle={ingredientStyle}
          manufacturedStyle={manufacturedStyle}
          storageStyle={storageStyle}
          allergenStyle={allergenStyle}
          handleChange={handleChange}
        />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Mode</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={showBorder}
            onChange={(event) => setShowBorder(event.target.value === "true")}
          >
            <FormControlLabel
              value={true}
              control={<Radio sx={{ color: "#e3e3e3" }} />}
              label="Edit Mode"
            />
            <FormControlLabel
              value={false}
              control={<Radio sx={{ color: "#e3e3e3" }} />}
              label="Preview Mode"
            />
          </RadioGroup>
        </FormControl>
        {isLabelUpdating ? (
          <CircularProgress />
        ) : (
          <LabelCard
            type={labelState.label_temp}
            ref={contentRef}
            logo={labelState.logo}
            itemCode={labelState.item_code}
            setItemCode={handleItemCodeChange}
            customerItemCode={labelState.customer_item_code}
            setCustomerItemCode={handleCustomerItemCodeChange}
            lotNumber={labelState.lot_number}
            lotNumberType={labelState.lot_number_type}
            setLotNumberType={handleLotNumberTypeChange}
            setLotNumber={handleLotNumberChange}
            setLogo={handleLogoChange}
            labelInput={labelInput}
            showProductNameEN={true}
            showProductNameZH={true}
            isEditedMode={true}
            setProductNameEN={handleProductNameENChange}
            setProductNameZH={handleProductNameZHChange}
            productNameEN={labelState.product_name_en}
            productNameZH={labelState.product_name_zh}
            setIngredient={handleIngredientChange}
            ingredient={labelState.ingredient}
            allergen={labelState.allergen}
            setAllergen={handleAllergenChange}
            allergenStyle={allergenStyle}
            setWeight={handleWeightChange}
            weight={labelState.weight}
            caseQuantity={labelState.case_quantity}
            setCaseQuantity={handleCaseQuantityChange}
            caseUnit={labelState.case_unit}
            setCaseUnit={handleCaseUnitChange}
            storage_1st={labelState.storage_1st}
            setStorage_1st={handleStorage1stChange}
            storage_2nd={labelState.storage_2nd}
            setStorage_2nd={handleStorage2ndChange}
            barcode={labelState.barcode}
            setBarcode={handleBarcodeChange}
            setManufactured={handleManufacturedChange}
            manufactured={labelState.manufactured}
            editMode={prop.editMode}
            setEditMode={prop.setEditMode}
            productNameENStyle={productNameENStyle}
            productNameZHStyle={productNameZHStyle}
            defaultText={prop.defaultText}
            ingredientStyle={ingredientStyle}
            manufacturedStyle={manufacturedStyle}
            storageStyle={storageStyle}
            defaultLabelStyle={labelStyle.data[0] as iLabelStyle}
            showBorder={showBorder}
          />
        )}
      </View>
      <Print>
        <LabelForm
          isEditedView={true}
          id={prop.selectLabelInfo.id}
          logo={labelState.logo}
          setLogo={handleLogoChange}
          itemCode={labelState.item_code}
          setItemCode={handleItemCodeChange}
          customerItemCode={labelState.customer_item_code}
          setCustomerItemCode={handleCustomerItemCodeChange}
          lotNumber={labelState.lot_number}
          lotNumberType={labelState.lot_number_type}
          setLotNumberType={handleLotNumberTypeChange}
          setLotNumber={handleLotNumberChange}
          productNameEN={labelState.product_name_en}
          setProductNameEN={handleProductNameENChange}
          productNameZH={labelState.product_name_zh}
          setProductNameZH={handleProductNameZHChange}
          ingredient={labelState.ingredient}
          setIngredient={handleIngredientChange}
          weight={labelState.weight}
          setWeight={handleWeightChange}
          caseQuantity={labelState.case_quantity}
          setCaseQuantity={handleCaseQuantityChange}
          caseUnit={labelState.case_unit}
          setCaseUnit={handleCaseUnitChange}
          caseGtin={labelState.case_gtin}
          setCaseGtin={handleCaseGtinChange}
          manufactured={labelState.manufactured}
          setManufactured={handleManufacturedChange}
          storage_1st={labelState.storage_1st}
          setStorage_1st={handleStorage1stChange}
          storage_2nd={labelState.storage_2nd}
          setStorage_2nd={handleStorage2ndChange}
          barcode={labelState.barcode}
          setBarcode={handleBarcodeChange}
          shelfLife_1st={labelState.shelf_life_1st}
          setShelfLife_1st={handleShelfLife1stChange}
          shelfLife_2nd={labelState.shelf_life_2nd}
          setShelfLife_2nd={handleShelfLife2ndChange}
          labelTemp={labelState.label_temp}
          setLabelTemp={handleLabelTempChange}
          allergen={labelState.allergen}
          setAllergen={handleAllergenChange}
          formError={formError}
          editMode={prop.editMode}
          setEditMode={prop.setEditMode}
          updateLabel={(event) => {
            event.preventDefault();
            updateLabel(labelInput, labelStyleuUpdates);
          }}
          deleteLabel={() => deleteLabel(prop.selectLabelInfo.id)}
        />
      </Print>
    </Container>
  );
};

export default LabelEditCard;
