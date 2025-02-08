"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { Container, View, Print } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/type/labelType";
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
  const [logo, setLogo] = useState<string>(prop.selectLabelInfo.logo);
  const [labelTemp, setLabelTemp] = useState<string>(
    prop.selectLabelInfo.label_temp
  );

  const [itemCode, setItemCode] = useState<string>(
    prop.selectLabelInfo.item_code
  );
  const [customerItemCode, setCustomerItemCode] = useState<string>(
    prop.selectLabelInfo.customer_item_code
  );
  const [lotNumber, setLotNumber] = useState<string>(
    prop.selectLabelInfo.lot_number
  );
  const [productNameEN, setProductNameEN] = useState<string>(
    prop.selectLabelInfo.product_name_en
  );
  const [productNameENStyle, setProductNameENStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 24,
    fontFamily: "Arial",
    fontWeight: 700,
    rows: 2,
    lineHeight: 1.2,
  });
  const [productNameZH, setProductNameZH] = useState<string>(
    prop.selectLabelInfo.product_name_zh
  );
  const [productNameZHStyle, setProductNameZHStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 24,
    fontFamily: "Arial",
    fontWeight: 700,
    rows: 2,
    lineHeight: 1.2,
  });

  const [weight, setWeight] = useState<string>(prop.selectLabelInfo.weight);

  const [weightStyle, setWeightStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  });
  const [caseQuantity, setCaseQuantity] = useState<number>(
    prop.selectLabelInfo.case_quantity
  );
  const [caseUnit, setCaseUnit] = useState<string>(
    prop.selectLabelInfo.case_unit
  );
  const [storage, setStorage] = useState<string>(prop.selectLabelInfo.storage);
  const [storageStyle, setStorageStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  });
  const [shelfLife, setShelfLife] = useState<string>(
    prop.selectLabelInfo.shelf_life
  );
  const [caseGtin, setCaseGtin] = useState<string>(
    prop.selectLabelInfo.case_gtin
  );
  const [ingredient, setIngredient] = useState<string>(
    prop.selectLabelInfo.ingredient
  );
  const [allergen, setAllergen] = useState<string>(
    prop.selectLabelInfo.allergen
  );
  const [allergenStyle, setAllergenStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
    rows: 1,
    lineHeight: 1.2,
  });
  const [ingredientStyle, setIngredientStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
    rows: 4,
    lineHeight: 1.2,
  });
  const [manufactured, setManufactured] = useState<string>(
    prop.selectLabelInfo.manufactured
  );
  
  const [manufacturedStyle, setManufacturedStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  });
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);

  const [formError, setFormError] = useState<formState>({
    error: false,
    message: "",
    locale: "",
  });
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const labelInput = {
    id: prop.selectLabelInfo.id,
    logo: logo,
    item_code: itemCode, // Add appropriate value
    customer_item_code: customerItemCode,
    lot_number: lotNumber, // Add appropriate value
    product_name_en: productNameEN,
    product_name_zh: productNameZH,
    weight: weight,
    case_quantity: caseQuantity,
    case_unit: caseUnit,
    storage: storage,
    shelf_life: shelfLife,
    case_gtin: caseGtin,
    ingredient: ingredient,
    manufactured: manufactured,
    label_temp: labelTemp,
    allergen: allergen,
  };

  useEffect(() => {
    // List of fields to check
    if (!submitClicked) return;
    const validations = [
      {
        field: itemCode,
        message: "Item code is required",
        locale: "item_code",
      },
      {
        field: productNameEN,
        message: "Product Name (English) is required",
        locale: "product_name_en",
      },
      {
        field: productNameZH,
        message: "Product Name (Chinese) is required",
        locale: "product_name_zh",
      },
      { field: weight, message: "Net Weight is required", locale: "weight" },
      {
        field: caseQuantity,
        message: "Case Quantity is required",
        locale: "case_quantity",
      },
      {
        field: caseUnit,
        message: "Case Unit is required",
        locale: "case_unit",
      },
      {
        field: storage,
        message: "Storage Requirements is required",
        locale: "storage",
      },
      {
        field: shelfLife,
        message: "Shelf Life is required",
        locale: "shelf_life",
      },
      {
        field: allergen,
        message: "Allergen is required",
        locale: "Allergen",
      },
      {
        field: ingredient,
        message: "Ingredient Info is required",
        locale: "ingredient",
      },
      {
        field: manufactured,
        message: "Manufactured For is required",
        locale: "manufactured",
      },
      {
        field: caseGtin,
        message: "Case GTIN is required and must be 12 characters",
        locale: "case_gtin",
        validate: (value: string) => value?.length === 12,
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
    itemCode,
    productNameEN,
    productNameZH,
    weight,
    caseQuantity,
    caseUnit,
    storage,
    shelfLife,
    caseGtin,
    ingredient,
    manufactured,
    submitClicked,
    allergen,
  ]);

  useEffect(() => {
    if (labelStyle?.data?.[0]) {
      const {
        product_name_en,
        product_name_zh,
        weight,
        ingredient,
        manufactured,
        storage,
        allergen,
      } = labelStyle.data[0];
    
      // Safe JSON parsing function
      const safeParse = (value: string) => {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error("Invalid JSON:", value, error);
          return value; // Return original value if parsing fails
        }
      };
    
      const productNameEnObj = safeParse(product_name_en);
      const productNameZhObj = safeParse(product_name_zh);
      const weightObj = safeParse(weight);
      const ingredientObj = safeParse(ingredient);
      const manufacturedObj = safeParse(manufactured);
      const storageObj = safeParse(storage);
      const allergenObj = safeParse(allergen);

    console.log(labelStyle)
      


      setProductNameENStyle((prevStyle) => ({
        ...prevStyle,
        color: productNameEnObj?.color,
        fontStyle: productNameEnObj?.fontStyle,
        fontSize: productNameEnObj?.fontSize,
        fontFamily: productNameEnObj?.fontFamily,
        fontWeight: productNameEnObj?.fontWeight,
        rows: productNameEnObj?.rows,
        lineHeight: productNameEnObj?.lineHeight,
      }));
      setProductNameZHStyle((prevStyle) => ({
        ...prevStyle,
        color: productNameZhObj?.color,
        fontStyle: productNameZhObj?.fontStyle,
        fontSize: productNameZhObj?.fontSize,
        fontFamily: productNameZhObj?.fontFamily,
        fontWeight: productNameZhObj?.fontWeight,
        rows: productNameZhObj?.rows,
        lineHeight: productNameZhObj?.lineHeight,
      }));
      setWeightStyle((prevStyle) => ({
        ...prevStyle,
        color: weightObj?.color,
        fontStyle: weightObj?.fontStyle,
        fontSize: weightObj?.fontSize,
        fontFamily: weightObj?.fontFamily,
        fontWeight: weightObj?.fontWeight,
      }));
      setIngredientStyle((prevStyle) => ({
        ...prevStyle,
        color: ingredientObj?.color,
        fontStyle: ingredientObj?.fontStyle,
        fontSize: ingredientObj?.fontSize,
        fontFamily: ingredientObj?.fontFamily,
        fontWeight: ingredientObj?.fontWeight,
        rows: ingredientObj?.rows,
        lineHeight: ingredientObj?.lineHeight,
      }));
      setManufacturedStyle((prevStyle) => ({
        ...prevStyle,
        color: manufacturedObj?.color,
        fontStyle: manufacturedObj?.fontStyle,
        fontSize: manufacturedObj?.fontSize,
        fontFamily: manufacturedObj?.fontFamily,
        fontWeight: manufacturedObj?.fontWeight,
        rows: manufacturedObj?.rows,
        lineHeight: manufacturedObj?.lineHeight,
      }));
      setStorageStyle((prevStyle) => ({
        ...prevStyle,
        color: storageObj?.color,
        fontStyle: storageObj?.fontStyle,
        fontSize: storageObj?.fontSize,
        fontFamily: storageObj?.fontFamily,
        fontWeight: storageObj?.fontWeight,
      }));
      setAllergenStyle((prevStyle) => ({
        ...prevStyle,
        color: allergenObj?.color,
        fontStyle: allergenObj?.fontStyle,
        fontSize: allergenObj?.fontSize,
        fontFamily: allergenObj?.fontFamily,
        fontWeight: allergenObj?.fontWeight,
        rows: allergenObj?.rows,
        lineHeight: allergenObj?.lineHeight,
      }));
    }

  }, [labelStyle]);



  const labelStyleuUpdates: iLabelStyle = {
    id: prop.selectLabelInfo.id,
    item_code: labelStyle ? labelStyle.data[0]?.item_code : prop.defaultText,
    customer_item_code: labelStyle
      ? labelStyle.data[0]?.customer_item_code
      : prop.defaultText,
    lot_number: labelStyle ? labelStyle.data[0]?.lot_number : prop.defaultText,
    product_name_en: productNameENStyle,
    product_name_zh: productNameZHStyle,
    ingredient: ingredientStyle,
    weight: labelStyle ? labelStyle.data[0]?.weight : prop.defaultText,
    storage: storageStyle,
    manufactured: manufacturedStyle,
    case_quantity: labelStyle ? labelStyle.data[0]?.case_quantity : prop.defaultText,
    case_unit: labelStyle ? labelStyle.data[0]?.case_unit : prop.defaultText,
    shelf_life: labelStyle ? labelStyle.data[0]?.shelf_life : prop.defaultText,
    allergen: allergenStyle,
  };

  const updateLabel = async (
    labelInfo: iLabelInfo,
    labelStyle: iLabelStyle
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
        await axios.post("/api/prisma/addNewActive", {
          event: "delete label",
          username: prop.userName,
          role: prop.userRole,
          label_code: itemCode,
          created_at: new Date(),
        });
        setTimeout(() => {
          setIsLabelDeleted(false);
          prop.setShowCard(() => ({
            labelActionCard: false,
            labelPrintCard: false,
            labelEditCard: false,
            labelDuplicateCard: false,
            isLabelUpdated: true,
          }));
          router.push("/dashboard/mylabels");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataType: iEditedMode,
    styleType: iTextStyleMode
  ) => {
    if (dataType === iEditedMode.productNameEn) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight ||
        styleType === iTextStyleMode.rows ||
        styleType === iTextStyleMode.lineHeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
      setProductNameENStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.productNameZh) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight ||
        styleType === iTextStyleMode.rows ||
        styleType === iTextStyleMode.lineHeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setProductNameZHStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.weight) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setWeightStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.ingredient) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight ||
        styleType === iTextStyleMode.rows ||
        styleType === iTextStyleMode.lineHeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
      setIngredientStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.storage) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
      setStorageStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.manufactured) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight ||
        styleType === iTextStyleMode.rows ||
        styleType === iTextStyleMode.lineHeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
      setManufacturedStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.allergen) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight ||
        styleType === iTextStyleMode.rows ||
        styleType === iTextStyleMode.lineHeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
      setAllergenStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    }
  };
//   const handleOutsideClick = (
//     event: MouseEvent | TouchEvent,
//     refs: React.RefObject<HTMLElement>[], // Accept an array of refs
//     editMode: iEditedMode,
//     setEditMode: (editMode: iEditedMode) => void,
// ): void => {
//     console.log("Checking outside click");

//     const isInsideAnyRef = refs.some(ref => ref.current?.contains(event.target as Node));

//     if (isInsideAnyRef) {
//         console.log("Click inside");
//     } else {
//         console.log("Click outside");
//         setEditMode(iEditedMode.empty);
//     }
// };

useEffect(() => {
  if (!contentRef.current || !stylePannelRef.current) return; // ✅ Prevent running if refs are not ready

  const handleModalClick = (event: MouseEvent) => {
      const isInside = [contentRef, stylePannelRef].some(
          (ref) => ref.current && ref.current.contains(event.target as Node)
      );

      if (!isInside) {
          console.log("Click outside");
          setEditMode(iEditedMode.empty);
      } else {
          console.log("Click inside");
      }
  };

  document.addEventListener("mousedown", handleModalClick);

  return () => {
      document.removeEventListener("mousedown", handleModalClick);
  };
}, [contentRef, stylePannelRef, editMode]); // ✅ Use `.current` in dependencies



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
          isEditMode={editMode}
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
            type={labelTemp}
            ref={contentRef}
            logo={logo}
            itemCode={itemCode}
            setItemCode={setItemCode}
            customerItemCode={customerItemCode}
            setCustomerItemCode={setCustomerItemCode}
            lotNumber={lotNumber}
            setLotNumber={setLotNumber}
            setLogo={setLogo}
            labelInput={labelInput}
            showProductNameEN={true}
            showProductNameZH={true}
            isEditedMode={true}
            setProductNameEN={setProductNameEN}
            setProductNameZH={setProductNameZH}
            productNameEN={productNameEN}
            productNameZH={productNameZH}
            setIngredient={setIngredient}
            ingredient={ingredient}
            allergen={allergen}
            setAllergen={setAllergen}
            allergenStyle={allergenStyle}
            setWeight={setWeight}
            weight={weight}
            caseQuantity={caseQuantity}
            setCaseQuantity={setCaseQuantity}
            caseUnit={caseUnit}
            setCaseUnit={setCaseUnit}
            storage={storage}
            setStorage={setStorage}
            setManufactured={setManufactured}
            manufactured={manufactured}
            editMode={editMode}
            setEditMode={setEditMode}
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
          logo={logo}
          setLogo={setLogo}
          itemCode={itemCode}
          setItemCode={setItemCode}
          customerItemCode={customerItemCode}
          setCustomerItemCode={setCustomerItemCode}
          lotNumber={lotNumber}
          setLotNumber={setLotNumber}
          productNameEN={productNameEN}
          setProductNameEN={setProductNameEN}
          productNameZH={productNameZH}
          setProductNameZH={setProductNameZH}
          ingredient={ingredient}
          setIngredient={setIngredient}
          weight={weight}
          setWeight={setWeight}
          caseQuantity={caseQuantity}
          setCaseQuantity={setCaseQuantity}
          caseUnit={caseUnit}
          setCaseUnit={setCaseUnit}
          caseGtin={caseGtin}
          setCaseGtin={setCaseGtin}
          manufactured={manufactured}
          setManufactured={setManufactured}
          storage={storage}
          setStorage={setStorage}
          shelfLife={shelfLife}
          setShelfLife={setShelfLife}
          labelTemp={labelTemp}
          setLabelTemp={setLabelTemp}
          allergen={allergen}
          setAllergen={setAllergen}
          formError={formError}
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
