"use client";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { PreviewContainer, EditContainer, Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AddNew = () => {
  // Log the data to check its structure
  const { data: userData, status } = useSession();
  const [formError, setFormError] = useState<formState>({
    error: false,
    message: "",
    locale: "",
  });
  const router = useRouter();
  const [logo, setLogo] = useState<string>("001");
  const [labelTemp, setLabelTemp] = useState<string>("4x4_a");
  const [itemCode, setItemCode] = useState<string>("");
  const [customerItemCode, setCustomerItemCode] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [productNameEN, setProductNameEN] = useState<string>("");
  const [productNameZH, setProductNameZH] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [allergen, setAllergen] = useState<string>("");
  const [caseQuantity, setCaseQuantity] = useState<number>(0);
  const [caseUnit, setCaseUnit] = useState<string>("tray");
  const [storage, setStorage] = useState<string>("Freezer");
  const [shelfLife, setShelfLife] = useState<string>("");
  const [caseGtin, setCaseGtin] = useState<string>("000000000000");
  const [barcode, setBarcode] = useState<string>("111111111111");
  const [ingredient, setIngredient] = useState<string>("");
  const [manufactured, setManufactured] = useState<string>("");
  const [sendAnewLabel, setSendAnewLabel] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [showBorder, setShowBorder] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const duplicatedLabel = searchParams.get("duplicatedLabel");
  useEffect(() => {
    if (duplicatedLabel) {
      try {
        // Safely parse the duplicatedLabel string into an object
        const parsedData = JSON.parse(duplicatedLabel);

        // Set state from parsed data with default values in case any field is missing
        setProductNameEN(parsedData.product_name_en || "");
        setProductNameZH(parsedData.product_name_zh || "");
        setIngredient(parsedData.ingredient || "");
        setWeight(parsedData.weight || "");
        setManufactured(parsedData.manufactured || "");
        setStorage(parsedData.storage || "");
        setCaseQuantity(parsedData.case_quantity || "");
        setCaseUnit(parsedData.case_unit || "");
        setShelfLife(parsedData.shelf_life || "");
        setAllergen(parsedData.allergen || "");
        setLogo(parsedData.logo || "");
      } catch (error) {
        console.error("Error parsing duplicatedLabel:", error);
        // You could also handle the error state here if you want to display something to the user
      }
    }
  }, [duplicatedLabel]);

  const defaultHeaderStyle = {
    color: "#000000",
    fontSize: 16,
    fontWeight: 700,
    fontStyle: "Normal",
    fontFamily: "Arial",
    rows:2
  };
  const defaultTextStyle = {
    color: "#000000",
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "Normal",
    fontFamily: "Arial",
  };
  
  const [productNameENStyle, setProductNameENStyle] =
    useState<iTextStyle>( defaultHeaderStyle);
  const [productNameZHStyle, setProductNameZHStyle] =
    useState<iTextStyle>(defaultHeaderStyle);
  const [ingredientStyle, setingredientStyle] =
    useState<iTextStyle>({...defaultTextStyle,rows:4});
  const [manufacturedStyle, setManufacturedStyle] =
    useState<iTextStyle>(defaultTextStyle);
  const [weightStyle, setWeightStyle] = useState<iTextStyle>({...defaultTextStyle,rows:1});
  const [allergenStyle, setAllergenStyle] =
    useState<iTextStyle>({...defaultTextStyle,rows:1});
  const [storageStyle, setStorageStyle] =
    useState<iTextStyle>({...defaultTextStyle,rows:1});

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
    lot_number: lotNumber,
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
    barcode: barcode,
  };

  const defaultLabelStyle = {
    id: lastItem && lastItem.id + 1,
    item_code: defaultTextStyle,
    customer_item_code: defaultTextStyle,
    lot_number: defaultTextStyle,
    product_name_en: productNameENStyle,
    product_name_zh: productNameZHStyle,
    weight: weightStyle,
    allergen:allergenStyle,
    case_quantity: defaultTextStyle,
    case_unit: defaultTextStyle,
    storage: defaultTextStyle,
    shelf_life: defaultTextStyle,
    case_gtin: defaultTextStyle,
    ingredient: ingredientStyle,
    manufactured:manufacturedStyle,
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
        styleType === iTextStyleMode.fontWeight||
        styleType === iTextStyleMode.fontStyle 
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
    } else if (dataType === iEditedMode.ingredient) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setingredientStyle((prevStyle: iTextStyle) => ({
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
    } else if (dataType === iEditedMode.allergen) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setAllergenStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.manufactured) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setManufacturedStyle((prevStyle: iTextStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    } else if (dataType === iEditedMode.storage) {
      const value =
        styleType === iTextStyleMode.fontSize ||
        styleType === iTextStyleMode.fontWeight
          ? Number(event.target.value) // Convert to number for fontSize or fontWeight
          : event.target.value; // Keep as string for other properties

      setStorageStyle((prevStyle: iTextStyle) => ({
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
          ingredientStyle={ingredientStyle}
          manufacturedStyle={manufacturedStyle}
          storageStyle={storageStyle}
          handleChange={handleChange}
          allergenStyle={allergenStyle}
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
        <LabelCard
          type={labelTemp}
          labelInput={labelInput}
          isEditedMode={true}
          itemCode={itemCode}
          customerItemCode={customerItemCode}
          setCustomerItemCode={setCustomerItemCode}
          lotNumber={lotNumber}
          setLotNumber={setLotNumber}
          setItemCode={setItemCode}
          setProductNameEN={setProductNameEN}
          setProductNameZH={setProductNameZH}
          productNameEN={productNameEN}
          productNameZH={productNameZH}
          setIngredient={setIngredient}
          ingredient={ingredient}
          setWeight={setWeight}
          weight={weight}
          allergen={allergen}
          setAllergen={setAllergen}
          setManufactured={setManufactured}
          setStorage={setStorage}
          manufactured={manufactured}
          caseQuantity={caseQuantity}
          setCaseQuantity={setCaseQuantity}
          caseUnit={caseUnit}
          setCaseUnit={setCaseUnit}
          storage={storage}
          barcode={barcode}
          setBarcode={setBarcode}
          defaultLabelStyle={defaultLabelStyle}
          productNameENStyle={productNameENStyle}
          productNameZHStyle={productNameZHStyle}
          defaultText={defaultTextStyle}
          allergenStyle={allergenStyle}
          ingredientStyle={ingredientStyle}
          manufacturedStyle={manufacturedStyle}
          storageStyle={storageStyle}
          editMode={editMode}
          setEditMode={setEditMode}
          logo={logo}
          setLogo={setLogo}
          ref={contentRef}
          showBorder={showBorder}
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
          barcode={barcode}
          setBarcode={setBarcode}
          manufactured={manufactured}
          setManufactured={setManufactured}
          storage={storage}
          setStorage={setStorage}
          shelfLife={shelfLife}
          setShelfLife={setShelfLife}
          formError={formError}
          createNewLabel={createNewLabel}
          setLabelTemp={setLabelTemp}
          labelTemp={labelTemp}
          allergen={allergen}
          setAllergen={setAllergen}
          setEditMode={setEditMode}
          editMode={editMode}
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

const AddNewPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNew />
    </Suspense>
  );
};

export default AddNewPageWithSuspense;
