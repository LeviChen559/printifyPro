"use client";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { PreviewContainer, EditContainer, Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useRouter ,useSearchParams} from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import UserState from "@/components/userState";
import useSWR from "swr";
import LabelCard from "@/section/labelCards";
import axios from "axios";
import LottieAnimation from "@/components/lottie/send";
import AnimationJson from "@/components/lottie/send.json";
import { iLabelInfo } from "@/type/labelType";
import StylePanel from "@/components/stylePanel";
import {
  iTextStyleMode,
  iEditedMode,
  iTextStyle,
  formState,
} from "@/type/labelType";
import LabelForm from "@/section/labelForm";
import { fetcher } from "@/utils/lib/fetcher";


const AddNew = () => {
  // Log the data to check its structure
  const { data: userData, status } = useSession();
  const [formError, setFormError] = useState<formState>({
    error: false,
    message: "",
    locale: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const duplicatedLabel = searchParams.get('duplicatedLabel')
  
  const [logo, setLogo] = useState<string>("001");
  const [labelSize, setLabelSize] = useState<string>("4x4_a");
  const [itemCode, setItemCode] = useState<string>("");
  const [customerItemCode, setCustomerItemCode] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [productNameEN, setProductNameEN] = useState<string>("");
  const [productNameZH, setProductNameZH] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("g/tray");
  const [caseQuantity, setCaseQuantity] = useState<number>(0);
  const [caseUnit, setCaseUnit] = useState<string>("tray");
  const [storageRequirements, setStorageRequirements] = useState<string>("Freezer");
  const [shelfLife, setShelfLife] = useState<number>(1);
  const [caseGtin, setCaseGtin] = useState<string>("000000000000");
  const [ingredientInfo, setIngredientInfo] = useState<string>("");
  const [manufacturedFor, setManufacturedFor] = useState<string>("");
  const [sendAnewLabel, setSendAnewLabel] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);

  useEffect(() => {
    if (duplicatedLabel) {
      const parsedData = JSON.parse(duplicatedLabel);
      
      setProductNameEN(parsedData.product_name_en || "");
      setProductNameZH(parsedData.product_name_zh || "");
      setIngredientInfo(parsedData.ingredient_info || "");
      setWeight(parsedData.weight || "");
      setWeightUnit(parsedData.weight_unit || "");
      setManufacturedFor(parsedData.manufactured_for || "");
      setStorageRequirements(parsedData.storage_requirements || "");
      setCaseQuantity(parsedData.case_quantity || "");
      setCaseUnit(parsedData.case_unit || "");
      setLogo(parsedData.logo || "");
    }
  }, [duplicatedLabel]);
  
  const defaultHeaderStyle = {
    color: "#000000",
    fontSize: 24,
    fontWeight: 700,
    fontStyle: "normal",
    fontFamily: "Arial",
  };
  const defaultTextStyle = {
    color: "#000000",
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    fontFamily: "Arial",
  };
  const [productNameENStyle, setProductNameENStyle] =
    useState<iTextStyle>(defaultHeaderStyle);
  const [productNameZHStyle, setProductNameZHStyle] =
    useState<iTextStyle>(defaultHeaderStyle);
  const [ingredientInfoStyle, setIngredientInfoStyle] =
    useState<iTextStyle>(defaultTextStyle);
  const [manufacturedForStyle, setManufacturedForStyle] =
    useState<iTextStyle>(defaultTextStyle);
  const [weightStyle, setWeightStyle] = useState<iTextStyle>(defaultTextStyle);
  const [weightUnitStyle, setWeightUnitStyle] =
    useState<iTextStyle>(defaultTextStyle);
  const [storageRequirementsStyle, setStorageRequirementsStyle] =
    useState<iTextStyle>(defaultTextStyle);

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

  const { data: labelData, error: labelError } = useSWR(
    "/api/prisma/getMyLabels",
    fetcher
  );
  const lastItem = labelData && labelData[0];
  const isUniqueItemCode =
    labelData &&
    labelData.some((item: iLabelInfo) => item.item_code !== itemCode);

  
  const contentRef = useRef<HTMLDivElement>(null);

  const labelInput = {
    id: lastItem && lastItem.id + 1, // Add appropriate value
    logo: logo,
    item_code: isUniqueItemCode && itemCode, // Add appropriate value
    customer_item_code: customerItemCode,
    lot_number:lotNumber,
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
  console.log("labelInput", labelInput);

  const defaultLabelStyle = {
    id: lastItem && lastItem.id + 1,
    item_code: defaultTextStyle,
    customer_item_code: defaultTextStyle,
    lot_number: defaultTextStyle,
    product_name_en: productNameENStyle,
    product_name_zh: productNameZHStyle,
    weight: weightStyle,
   weight_unit: weightUnitStyle,
    case_quantity: defaultTextStyle,
    case_unit: defaultTextStyle,
    storage_requirements: defaultTextStyle,
    shelf_life: defaultTextStyle,
    case_gtin: defaultTextStyle,
    ingredient_info: ingredientInfoStyle,
    manufactured_for: manufacturedForStyle
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const createNewLabel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitClicked(true);
    if (formError.error) return;
    try {
      const response = await axios.post("/api/prisma/addNewLabel", {
        labelInput,
        defaultLabelStyle,
      });
      console.log("response", response.data);
      console.log("lableInput", labelInput);
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
        console.error("Error creating label1:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating label2:", error);
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
    } else if (dataType === iEditedMode.ingredientInfo) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setIngredientInfoStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.weight) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setWeightStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.weightUnit) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setWeightUnitStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.manufacturedFor) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setManufacturedForStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.storageRequirements) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setStorageRequirementsStyle((prevStyle: iTextStyle) => ({
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
          weightStyle={weightStyle}
          weightUnitStyle={weightUnitStyle}
          ingredientInfoStyle={ingredientInfoStyle}
          manufacturedForStyle={manufacturedForStyle}
          storageRequirementsStyle={storageRequirementsStyle}
          handleChange={handleChange}
        />
       <LabelCard
  type={labelSize}
  labelInput={labelInput}
  isEditedMode
  itemCode={itemCode}
  customerItemCode={customerItemCode}
  setCustomerItemCode={setCustomerItemCode}
  lotNumber={lotNumber}
  setLotNumber={setLotNumber}
  setItemCode={setItemCode}
  setProductNameEN={setProductNameEN}
  setProductNameZH={setProductNameZH}
  productNameEN={ productNameEN}
  productNameZH={ productNameZH}
  setIngredientInfo={setIngredientInfo}
  ingredientInfo={ ingredientInfo}
  setWeight={setWeight}
  weight={ weight}
  setManufacturedFor={setManufacturedFor}
  setStorageRequirements={setStorageRequirements}
  manufacturedFor={ manufacturedFor}
  setWeightUnit={setWeightUnit}
  weightUnit={ weightUnit}
  caseQuantity={ caseQuantity}
  setCaseQuantity={setCaseQuantity}
  caseUnit={ caseUnit}
  setCaseUnit={setCaseUnit}
  storageRequirements={ storageRequirements}
  defaultLabelStyle={defaultLabelStyle}
  productNameENStyle={productNameENStyle}
  productNameZHStyle={productNameZHStyle}
  weightStyle={weightStyle}
  weightUnitStyle={weightUnitStyle}
  ingredientInfoStyle={ingredientInfoStyle}
  manufacturedForStyle={manufacturedForStyle}
  storageRequirementsStyle={storageRequirementsStyle}
  editMode={editMode}
  setEditMode={setEditMode}
  logo={ logo}
  setLogo={setLogo}
  ref={contentRef}
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
          <LabelForm
          isEditedView={false}
          logo={logo}
          setLogo={setLogo}
          itemCode={itemCode}
          customerItemCode={customerItemCode}
          setCustomerItemCode={setCustomerItemCode}
          lotNumber={lotNumber}
          setLotNumber={setLotNumber}
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
          setLabelSize={setLabelSize}
          labelSize={labelSize}
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
