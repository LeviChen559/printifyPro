"use client";

import React, { useEffect, Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { PreviewContainer, EditContainer, Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import UserState from "@/components/userState";
import useSWR from "swr";
import LabelCard from "@/components/labelCard";
import axios from "axios";
import LottieAnimation from "@/components/lottie/send";
import AnimationJson from "@/components/lottie/send.json";
import { iLabelInfo } from "@/components/labelTable";
import StylePanel from "@/components/stylePanel";
import { iTextStyleMode, iEditedMode, iTextStyle } from "@/type/labelType";
import AddNewLabelForm from "@/section/addNewLabelForm";
interface formState {
  error: boolean;
  message: string;
  locale: string;
}

const AddNew = () => {
  // Log the data to check its structure
  const { data: userData, status } = useSession();
  const [formError, setFormError] = useState<formState>({
    error: false,
    message: "",
    locale: "",
  });
  const router = useRouter();
  const [itemCode, setItemCode] = useState<string>("");
  const [productNameEN, setProductNameEN] = useState<string>("");
  const [productNameZH, setProductNameZH] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("");
  const [caseQuantity, setCaseQuantity] = useState<number>(0);
  const [caseUnit, setCaseUnit] = useState<string>("");
  const [storageRequirements, setStorageRequirements] = useState<string>("");
  const [shelfLife, setShelfLife] = useState<string>("");
  const [caseGtin, setCaseGtin] = useState<string>("00000000000000");
  const [ingredientInfo, setIngredientInfo] = useState<string>("");
  const [manufacturedFor, setManufacturedFor] = useState<string>("");
  const [sendAnewLabel, setSendAnewLabel] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [productNameENStyle, setProductNameENStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 24,
    fontFamily: "Arial",
    fontWeight: 700,
  });
  const [productNameZHStyle, setProductNameZHStyle] = useState<iTextStyle>({
    color: "#000000",
    fontStyle: "Normal",
    fontSize: 24,
    fontFamily: "Arial",
    fontWeight: 700,
  });

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
      if ( (!field || (validate && !validate(field)))) {
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

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: labelData, error: labelError } = useSWR(
    "/api/prisma/getMyLabels",
    fetcher
  );
  const lastItem = labelData && labelData[0];
  const isUniqueItemCode =
    labelData &&
    labelData.some((item: iLabelInfo) => item.item_code !== itemCode);

  const lableInput = {
    id: lastItem && lastItem.id + 1, // Add appropriate value
    item_code: isUniqueItemCode && itemCode, // Add appropriate value
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
  };
  const defaultTextlStyle = {
    color: "#000000",
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    fontFamily: "Arial",
  };
  const defaultHeaderStyle = {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    fontStyle: "normal",
    fontFamily: "Arial",
  };

  const defaultLabelStyle = {
    id: 1,
    item_code: defaultTextlStyle,
    product_name_en: defaultHeaderStyle,
    product_name_zh: defaultHeaderStyle,
    weight: defaultTextlStyle,
    weight_unit: defaultTextlStyle,
    case_quantity: defaultTextlStyle,
    case_unit: defaultTextlStyle,
    storage_requirements: defaultTextlStyle,
    shelf_life: defaultTextlStyle,
    case_gtin: defaultTextlStyle,
    ingredient_info: defaultTextlStyle,
    manufactured_for: defaultTextlStyle,
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  console.log("formError.error", formError.error);
  const createNewLabel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitClicked(true);
    if (formError.error) return;
    try {
      const response = await axios.post("/api/prisma/addNewLabel", lableInput);
      console.log("response", response.data);
      console.log("lableInput", lableInput);
      // Directly access the data property from Axios response
      if (response.data.success) {
        await axios.post("/api/prisma/addNewActive", {
          event: "Add new label",
          username: userData?.user.name,
          role: userData?.user.role,
          label_code: itemCode,
          created_at: new Date(),
        });
        setSendAnewLabel(true);
        setTimeout(() => {
          setSendAnewLabel(false);
          router.push("/dashboard/mylabels");
        }, 3000);
      } else {
        console.error("Error creating label:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating label:", error);
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

      setProductNameENStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.productNameZh) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setProductNameZHStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    }
  };

  if (!labelData) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (labelError) {
    return <Container>Failed to load: {labelError.message}</Container>;
  }
  if (!userData) {
    return (
      <Container>
        <CircularProgress />
        <Typography>No access - You need to sign in first!</Typography>
      </Container>
    );
  }
  if (userData?.user.role !== "admin") {
    setTimeout(() => {
      router.push("/dashboard/mylabels");
    }, 1000);
    return (
      <Container>
        <Typography>
          No access - You need to be an admin to create labels!
        </Typography>
      </Container>
    );
  }
  return (
    <Container
      padding={"0px"}
      gap={0}
      justifyContent={sendAnewLabel ? "center" : "flex-start"}
    >
      <PreviewContainer>
        <StylePanel
          isEditMode={editMode}
          productNameENStyle={productNameENStyle}
          productNameZHStyle={productNameZHStyle}
          handleChange={handleChange}
        />
        <LabelCard
          labelInfo={lableInput}
          isEditedMode
          setProductNameEN={setProductNameEN}
          setProductNameZH={setProductNameZH}
          productNameEN={productNameEN}
          productNameZH={productNameZH}
          setIngredientInfo={setIngredientInfo}
          ingredientInfo={ingredientInfo}
          setWeight={setWeight}
          weight={weight}
          setManufacturedFor={setManufacturedFor}
          manufacturedFor={manufacturedFor}
          setWeightUnit={setWeightUnit}
          weightUnit={weightUnit}
          defaultLabelStyle={defaultLabelStyle}
          productNameENStyle={productNameENStyle}
          productNameZHStyle={productNameZHStyle}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </PreviewContainer>
      <EditContainer>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{ height: 100, width: "100%" }}
            />
          }
        >
          {userData ? (
            <UserState userData={userData} />
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
          )}
        </Suspense>
        <AddNewLabelForm
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
          formError={formError}
          createNewLabel={createNewLabel}
        />
      </EditContainer>
      {sendAnewLabel && (
        <>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#ffffffE6",
              position: "absolute",
              zIndex: 1000,
            }}
          />
          <LottieAnimation
            animationUrl={AnimationJson}
            text={"Add Label Successfully!"}
          />
        </>
      )}
    </Container>
  );
};

export default AddNew;
