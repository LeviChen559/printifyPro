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
}

const LabelEditCard: FC<iProps> = (prop) => {
  const { data: labelStyle, error } = useSWR(
    `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`,
    fetcher
  );
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLabelUpdating, setIsLabelUpdating] = useState<boolean>(false);
  const [isLabelDeleted, setIsLabelDeleted] = useState<boolean>(false);
  const [logo, setLogo] = useState<string>(prop.selectLabelInfo.logo);
  const [labelSize, setLabelSize] = useState<string>(
    prop.selectLabelInfo.label_size
  );

  const [itemCode, setItemCode] = useState<string>(
    prop.selectLabelInfo.item_code
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
  });

  const [weight, setWeight] = useState<number>(
    Number(prop.selectLabelInfo.weight)
  );

  const [weightStyle, setWeightStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  });

  const [weightUnit, setWeightUnit] = useState<string>(
    prop.selectLabelInfo.weight_unit
  );
  const [weightUnitStyle, setWeightUnitStyle] = useState<iTextStyle>({
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
  const [storageRequirements, setStorageRequirements] = useState<string>(
    prop.selectLabelInfo.storage_requirements
  );
  const [storageRequirementsStyle, setStorageRequirementsStyle] =
    useState<iTextStyle>({
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
    });
  const [shelfLife, setShelfLife] = useState<number>(
    prop.selectLabelInfo.shelf_life
  );
  const [caseGtin, setCaseGtin] = useState<string>(
    prop.selectLabelInfo.case_gtin
  );
  const [ingredientInfo, setIngredientInfo] = useState<string>(
    prop.selectLabelInfo.ingredient_info
  );
  const [ingredientInfoStyle, setIngredientInfoStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  });
  const [manufacturedFor, setManufacturedFor] = useState<string>(
    prop.selectLabelInfo.manufactured_for
  );
  const [manufacturedForStyle, setManufacturedForStyle] = useState<iTextStyle>({
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

  const labelInput = {
    id: prop.selectLabelInfo.id,
    logo: logo,
    item_code: itemCode, // Add appropriate value
    product_name_en: productNameEN,
    product_name_zh: productNameZH,
    weight: weight,
    weight_unit: weightUnit,
    case_quantity: caseQuantity,
    case_unit: caseUnit,
    storage_requirements: storageRequirements,
    shelf_life: shelfLife,
    case_gtin: caseGtin,
    ingredient_info: ingredientInfo,
    manufactured_for: manufacturedFor,
    label_size: labelSize,
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
        field: weightUnit,
        message: "Weight Unit is required",
        locale: "weight_unit",
      },
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
        field: storageRequirements,
        message: "Storage Requirements is required",
        locale: "storage_requirements",
      },
      {
        field: shelfLife,
        message: "Shelf Life is required",
        locale: "shelf_life",
      },
      {
        field: ingredientInfo,
        message: "Ingredient Info is required",
        locale: "ingredient_info",
      },
      {
        field: manufacturedFor,
        message: "Manufactured For is required",
        locale: "manufactured_for",
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
    weightUnit,
    caseQuantity,
    caseUnit,
    storageRequirements,
    shelfLife,
    caseGtin,
    ingredientInfo,
    manufacturedFor,
    submitClicked,
  ]);
  useEffect(() => {
    if (labelStyle?.data?.[0]) {
      const {
        product_name_en,
        product_name_zh,
        weight,
        weight_unit,
        ingredient_info,
        manufactured_for,
        storage_requirements,
      } = labelStyle.data[0];
      const productNameEnObj = product_name_en;
      const productNameZhObj = product_name_zh;
      const weightObj = weight;
      const ingredientInfoObj = ingredient_info;
      const manufacturedForObj = manufactured_for;
      const storageRequirementsObj = storage_requirements;
      const weightUnitObj = weight_unit;

      setProductNameENStyle((prevStyle) => ({
        ...prevStyle,
        color: productNameEnObj?.color,
        fontStyle: productNameEnObj?.fontStyle,
        fontSize: productNameEnObj?.fontSize,
        fontFamily: productNameEnObj?.fontFamily,
        fontWeight: productNameEnObj?.fontWeight,
      }));
      setProductNameZHStyle((prevStyle) => ({
        ...prevStyle,
        color: productNameZhObj?.color,
        fontStyle: productNameZhObj?.fontStyle,
        fontSize: productNameZhObj?.fontSize,
        fontFamily: productNameZhObj?.fontFamily,
        fontWeight: productNameZhObj?.fontWeight,
      }));
      setWeightStyle((prevStyle) => ({
        ...prevStyle,
        color: weightObj?.color,
        fontStyle: weightObj?.fontStyle,
        fontSize: weightObj?.fontSize,
        fontFamily: weightObj?.fontFamily,
        fontWeight: weightObj?.fontWeight,
      }));
      setIngredientInfoStyle((prevStyle) => ({
        ...prevStyle,
        color: ingredientInfoObj?.color,
        fontStyle: ingredientInfoObj?.fontStyle,
        fontSize: ingredientInfoObj?.fontSize,
        fontFamily: ingredientInfoObj?.fontFamily,
        fontWeight: ingredientInfoObj?.fontWeight,
      }));
      setManufacturedForStyle((prevStyle) => ({
        ...prevStyle,
        color: manufacturedForObj?.color,
        fontStyle: manufacturedForObj?.fontStyle,
        fontSize: manufacturedForObj?.fontSize,
        fontFamily: manufacturedForObj?.fontFamily,
        fontWeight: manufacturedForObj?.fontWeight,
      }));
      setStorageRequirementsStyle((prevStyle) => ({
        ...prevStyle,
        color: storageRequirementsObj?.color,
        fontStyle: storageRequirementsObj?.fontStyle,
        fontSize: storageRequirementsObj?.fontSize,
        fontFamily: storageRequirementsObj?.fontFamily,
        fontWeight: storageRequirementsObj?.fontWeight,
      }));
      setWeightUnitStyle((prevStyle) => ({
        ...prevStyle,
        color: weightUnitObj?.color,
        fontStyle: weightUnitObj?.fontStyle,
        fontSize: weightUnitObj?.fontSize,
        fontFamily: weightUnitObj?.fontFamily,
      }));
    }
  }, [labelStyle]);

  const defaultText = {
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: 400,
  };
  console.log("labelStyle",labelStyle)
  const labelStyleuUpdates: iLabelStyle = {
      id: prop.selectLabelInfo.id,
      item_code: labelStyle ? labelStyle.data[0]?.item_code : defaultText,
      product_name_en: productNameENStyle,
      product_name_zh: productNameZHStyle,
      ingredient_info: labelStyle? labelStyle.data[0]?.ingredient_info
        : defaultText,
      weight: labelStyle ? labelStyle.data[0]?.weight : defaultText,
      weight_unit: labelStyle ? labelStyle.data[0]?.weight_unit : defaultText,
      storage_requirements: labelStyle
        ? labelStyle.data[0]?.storage_requirements
        : defaultText,
      manufactured_for: labelStyle
        ? labelStyle.data[0]?.manufactured_for
        : defaultText,
      case_quantity: labelStyle ? labelStyle.data[0]?.case_quantity : defaultText,
      case_unit: labelStyle ? labelStyle.data[0]?.case_unit : defaultText,
      shelf_life: labelStyle ? labelStyle.data[0]?.shelf_life : defaultText,
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
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setProductNameENStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.productNameZh) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
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
    } else if (dataType === iEditedMode.weightUnit) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
          setWeightUnitStyle((prevStyle) => ({
        ...prevStyle, 
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.ingredientInfo) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setIngredientInfoStyle((prevStyle) => ({
       ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.storageRequirements) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
          setStorageRequirementsStyle((prevStyle) => ({
       ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.manufacturedFor) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties
          setManufacturedForStyle((prevStyle) => ({
       ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    }
      
  };

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
            isLabelUpdated: false,
          }))
        }
      />
      <View>
        <StylePanel
          isEditMode={editMode}
          productNameENStyle={productNameENStyle}
          productNameZHStyle={productNameZHStyle}
          weightStyle={weightStyle}
          weightUnitStyle={weightUnitStyle}
          ingredientInfoStyle={ingredientInfoStyle}
          manufacturedForStyle={manufacturedForStyle}
          storageRequirementsStyle={storageRequirementsStyle}
          handleChange={handleChange}
        />

        {isLabelUpdating ? (
          <CircularProgress />
        ) : (
          <LabelCard
            type={labelSize}
            ref={contentRef}
            logo={logo}
            itemCode={itemCode}
            setItemCode={setItemCode}
            setLogo={setLogo}
            labelInput={labelInput}
            showProductNameEN={true}
            showProductNameZH={true}
            isEditedMode={true}
            setProductNameEN={setProductNameEN}
            setProductNameZH={setProductNameZH}
            productNameEN={productNameEN}
            productNameZH={productNameZH}
            setIngredientInfo={setIngredientInfo}
            ingredientInfo={ingredientInfo}
            setWeight={setWeight}
            weight={weight}
            caseQuantity={caseQuantity}
            setCaseQuantity={setCaseQuantity}
            caseUnit={caseUnit}
            setCaseUnit={setCaseUnit}
            storageRequirements={storageRequirements}
          setStorageRequirements={setStorageRequirements}
            setManufacturedFor={setManufacturedFor}
            manufacturedFor={manufacturedFor}
            setWeightUnit={setWeightUnit}
            weightUnit={weightUnit}
            editMode={editMode}
            setEditMode={setEditMode}
            productNameENStyle={productNameENStyle}
            productNameZHStyle={productNameZHStyle}
            weightStyle={weightStyle}
            ingredientInfoStyle={ingredientInfoStyle}
            manufacturedForStyle={manufacturedForStyle}
            storageRequirementsStyle={storageRequirementsStyle}
            weightUnitStyle={weightUnitStyle}
            defaultLabelStyle={labelStyle.data[0] as iLabelStyle}
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
          productNameEN={productNameEN}
          setProductNameEN={setProductNameEN}
          productNameZH={productNameZH}
          setProductNameZH={setProductNameZH}
          ingredientInfo={ingredientInfo}
          setIngredientInfo={setIngredientInfo}
          weight={weight}
          setWeight={setWeight}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          caseQuantity={caseQuantity}
          setCaseQuantity={setCaseQuantity}
          caseUnit={caseUnit}
          setCaseUnit={setCaseUnit}
          caseGtin={caseGtin}
          setCaseGtin={setCaseGtin}
          manufacturedFor={manufacturedFor}
          setManufacturedFor={setManufacturedFor}
          storageRequirements={storageRequirements}
          setStorageRequirements={setStorageRequirements}
          shelfLife={shelfLife}
          setShelfLife={setShelfLife}
          labelSize={labelSize}
          setLabelSize={setLabelSize}
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
