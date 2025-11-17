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
  const [logo, setLogo] = useState<string>("hons");
  const [labelTemp, setLabelTemp] = useState<string>("sm_a");
  const [itemCode, setItemCode] = useState<string>("");
  const [customerItemCode, setCustomerItemCode] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [lotNumberType, setLotNumberType] = useState<string>("auto");
  const [productNameEN, setProductNameEN] = useState<string>("");
  const [productNameZH, setProductNameZH] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [allergen, setAllergen] = useState<string>("");
  const [caseQuantity, setCaseQuantity] = useState<number>(0);
  const [caseUnit, setCaseUnit] = useState<string>("tray");
  const [storage_1st, setStorage_1st] = useState<string>("Freezer");
  const [storage_2nd, setStorage_2nd] = useState<string>("Cooler");
  const [shelfLife_1st, setShelfLife_1st] = useState<number>(30);
  const [shelfLife_2nd, setShelfLife_2nd] = useState<number>(0);
  const [caseGtin, setCaseGtin] = useState<string>("00000000000");
  const [ingredient, setIngredient] = useState<string>("");
  const [manufactured, setManufactured] = useState<string>("");
  const [sendAnewLabel, setSendAnewLabel] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
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
        setLotNumberType(parsedData.lot_number_type || "auto");
        setIngredient(parsedData.ingredient || "");
        setWeight(parsedData.weight || "");
        setManufactured(parsedData.manufactured || "");
        setCaseQuantity(parsedData.case_quantity || "");
        setCaseUnit(parsedData.case_unit || "");
        setShelfLife_1st(parsedData.shelf_life_1st || "");
        setShelfLife_2nd(parsedData.shelf_life_2nd || "");
        setAllergen(parsedData.allergen || "");
        setLogo(parsedData.logo || "");
      } catch (error) {
        console.error("Error parsing duplicatedLabel:", error);
        // You could also handle the error state here if you want to display something to the user
      }
    }
  }, [duplicatedLabel]);

  const defaultHeaderStyle = {
    rows: 1,
    color: "#000000",
    fontSize: 30,
    fontStyle: "Normal",
    fontFamily: "Arial",
    fontWeight: 700,
    lineHeight: 1.2,
  };
  const defaultTextStyle = {
    rows: 1,
    color: "#000000",
    fontSize: 14,
    fontStyle: "Normal",
    fontFamily: "Arial",
    fontWeight: 400,
    lineHeight: 1.2,
  };
  const defaultStyle = {
    item_code: defaultTextStyle,
    customer_item_code: defaultTextStyle,
    lot_number: defaultTextStyle,
    product_name_en: defaultHeaderStyle,
    product_name_zh: defaultHeaderStyle,
    weight: defaultTextStyle,
    allergen: defaultTextStyle,
    case_quantity: defaultTextStyle,
    case_unit: defaultTextStyle,
    storage: defaultTextStyle,
    shelf_life: defaultTextStyle,
    case_gtin: defaultTextStyle,
    ingredient: { ...defaultTextStyle, rows: 8 },
    manufactured: defaultTextStyle,
  };

  const [productNameENStyle, setProductNameENStyle] = useState<iTextStyle>(
    defaultStyle.product_name_en
  );
  const [productNameZHStyle, setProductNameZHStyle] = useState<iTextStyle>(
    defaultStyle.product_name_zh
  );
  const [ingredientStyle, setingredientStyle] = useState<iTextStyle>(
    defaultStyle.ingredient
  );
  const [manufacturedStyle, setManufacturedStyle] = useState<iTextStyle>(
    defaultStyle.manufactured
  );
  const [weightStyle, setWeightStyle] = useState<iTextStyle>(
    defaultStyle.weight
  );
  const [allergenStyle, setAllergenStyle] = useState<iTextStyle>(
    defaultStyle.allergen
  );
  const [storageStyle, setStorageStyle] = useState<iTextStyle>(
    defaultStyle.storage
  );

  const validateForm = () => {
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
      {
        field: weight,
        message: "Weight is required",
        locale: "weight",
      },
      {
        field: caseQuantity,
        message: "Case quantity is required",
        locale: "case_quantity",
        validate: (value: number) => !isNaN(value) && value > 0,
      },
      {
        field: caseUnit,
        message: "Case unit is required",
        locale: "case_unit",
      },
      {
        field: storage_1st,
        message: "Storage (1st line) is required",
        locale: "storage_1st",
      },
      {
        field: storage_2nd,
        message: "Storage (2nd line) is required",
        locale: "storage_2nd",
      },
      {
        field: shelfLife_1st,
        message: "Shelf life (1st line) is required",
        locale: "shelf_life_1st",
        validate: (value: number) => !isNaN(value) && value > 0,
      },
      {
        field: caseGtin,
        message: "Case GTIN must be 11 characters or empty",
        locale: "case_gtin",
        validate: (value: string) => value.length === 11 || value === "",
      },
      {
        field: ingredient,
        message: "Ingredient is required",
        locale: "ingredient",
      },
      {
        field: allergen,
        message: "Allergen information is required",
        locale: "allergen",
      },
      {
        field: manufactured,
        message: "Manufactured location is required",
        locale: "manufactured",
      },
      {
        field: logo,
        message: "Logo is required",
        locale: "logo",
      },
      {
        field: labelTemp,
        message: "Label temperature is required",
        locale: "label_temp",
      },
      {
        field: lotNumber,
        message: "Lot number is required",
        locale: "lot_number",
      },
      {
        field: lotNumberType,
        message: "Lot number type is required",
        locale: "lot_number_type",
      },
    ];

    type ValidationRule = {
      field: string | number;
      message: string;
      locale: string;
      validate?: (value: string | number) => boolean;
    };

    for (const {
      field,
      message,
      locale,
      validate,
    } of validations as ValidationRule[]) {
      const isInvalid =
        field === "" ||
        field === null ||
        field === undefined ||
        (validate && !validate(field));

      if (isInvalid) {
        setFormError({
          error: true,
          message,
          locale,
        });
        return false;
      }
    }
    setFormError({ error: false, message: "", locale: "" });
    return true;
  };

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
    lot_number_type: lotNumberType,
    product_name_en: productNameEN,
    product_name_zh: productNameZH,
    weight: weight,
    case_quantity: caseQuantity,
    case_unit: caseUnit,
    storage_1st: storage_1st,
    shelf_life_1st: shelfLife_1st,
    storage_2nd: storage_2nd,
    shelf_life_2nd: shelfLife_2nd,
    case_gtin: caseGtin,
    ingredient: ingredient,
    manufactured: manufactured,
    label_temp: labelTemp,
    allergen: allergen,
  };

  const defaultLabelStyle = {
    id: lastItem && lastItem.id + 1,
    item_code: defaultTextStyle,
    customer_item_code: defaultTextStyle,
    lot_number: defaultTextStyle,
    product_name_en: productNameENStyle,
    product_name_zh: productNameZHStyle,
    weight: weightStyle,
    allergen: allergenStyle,
    case_quantity: defaultTextStyle,
    case_unit: defaultTextStyle,
    storage: defaultTextStyle,
    shelf_life: defaultTextStyle,
    case_gtin: defaultTextStyle,
    ingredient: ingredientStyle,
    manufactured: manufacturedStyle,
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const createNewLabel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Creating new label with input:", labelInput,validateForm(),formError);
    // run validation immediately
    if (!validateForm()) {
      return;
    }

    // Stop if there is a validation error
    try {
      const response = await axios.post("/api/prisma/addNewLabel", {
        labelInput,
        defaultLabelStyle,
      });
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
        styleType === iTextStyleMode.fontWeight ||
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
  if (userData?.user.role === "user") {
    setTimeout(() => {
      router.push("/dashboard/mylabels");
    }, 1000);
    return (
      <Container>
        <Typography>
          No access - You need to be an admin or manager to create labels!
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
          lotNumberType={lotNumberType}
          setLotNumberType={setLotNumberType}
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
          setStorage_1st={setStorage_1st}
          setStorage_2nd={setStorage_2nd}
          manufactured={manufactured}
          caseQuantity={caseQuantity}
          setCaseQuantity={setCaseQuantity}
          caseUnit={caseUnit}
          setCaseUnit={setCaseUnit}
          storage_1st={storage_1st}
          storage_2nd={storage_2nd}
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
          isPrintedView={false}
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
          lotNumberType={lotNumberType}
          setLotNumberType={setLotNumberType}
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
          manufactured={manufactured}
          setManufactured={setManufactured}
          storage_1st={storage_1st}
          setStorage_1st={setStorage_1st}
          storage_2nd={storage_2nd}
          setStorage_2nd={setStorage_2nd}
          shelfLife_1st={shelfLife_1st}
          setShelfLife_1st={setShelfLife_1st}
          shelfLife_2nd={shelfLife_2nd}
          setShelfLife_2nd={setShelfLife_2nd}
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
