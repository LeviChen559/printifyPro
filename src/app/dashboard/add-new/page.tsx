"use client";

import React, { useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { Container } from "../style";
import { PreviewContainer, EditContainer, Column } from "./style";

// import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import UserState from "@/components/userState";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import useSWR from "swr";
import LabelCard from "@/components/labelCard";
import Button from "@/components/button";
import axios from "axios";
import SendAnimation from "@/components/lottie/send";
import AnimationJson from "@/components/lottie/send.json";
import { iLabelInfo } from "@/components/labelTable";
import DropdownMenu from "@/components/dropdownMenu";

const AddNew = () => {
  // Log the data to check its structure
  const { data: userData, status } = useSession();
  const router = useRouter();
  const [itemCode, setItemCode] = React.useState<string>("");
  const [productNameEN, setProductNameEN] = React.useState<string>("");
  const [productNameZH, setProductNameZH] = React.useState<string>("");
  const [weight, setWeight] = React.useState<number>(0);
  const [weightUnit, setWeightUnit] = React.useState<string>("");
  const [caseQuantity, setCaseQuantity] = React.useState<number>(0);
  const [caseUnit, setCaseUnit] = React.useState<string>("");
  const [storageRequirements, setStorageRequirements] =
    React.useState<string>("");
  const [shelfLife, setShelfLife] = React.useState<string>("");
  const [caseGtin, setCaseGtin] = React.useState<string>("code-128");
  const [ingredientInfo, setIngredientInfo] = React.useState<string>("");
  const [sendAnewLabel, setSendAnewLabel] = React.useState<boolean>(false);

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
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const createNewLabel = async () => {
    try {
      const response = await axios.post("/api/prisma/addNewLabel", lableInput);
      console.log("response", response.data);
      console.log("lableInput", lableInput);
      // Directly access the data property from Axios response
      if (response.data.success) {
        setSendAnewLabel(true);
        setTimeout(() => {
          setSendAnewLabel(false);
          router.push("/dashboard/mylabels");
        }, 500);
      } else {
        console.error("Error creating label:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating label:", error);
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
  if (userData?.user.role!=="admin") {
    setTimeout(() => {
      router.push("/dashboard/mylabels");
    },1000)
    return (
      <Container>
        <Typography>No access - You need to be an admin to create labels!</Typography>
      </Container>
    );
  }
  if (!userData) {
    return (
      <Container>
        <CircularProgress />
        <Typography>No access - You need to sign in first!</Typography>
      </Container>
    );
  }
  return (
    <Container padding={"0px"} gap={0}>
      <PreviewContainer>
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
        <LabelCard labelInfo={lableInput} isEditedMode />
      </PreviewContainer>
      <EditContainer>
        <Column>
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"nowrap"}
            gap={2}
          >
            <FormPropsTextFields
              id="id"
              label="id"
              value={lastItem.id + 1}
              required={true}
              type="number"
              placeholder=""
              readOnly={true}
              onChange={(e) => console.log(Number(e.target.value))}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0" }}
            />
            <FormPropsTextFields
              id="item_code"
              label="item_code"
              value={itemCode}
              required={true}
              type="text"
              placeholder="item_code"
              onChange={(e) => setItemCode(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0" }}
            />
          </Box>
          <FormPropsTextFields
            id="product_name_en"
            label="Product Name (English)"
            value={productNameEN}
            required={true}
            type="text"
            placeholder="Product Name (English)"
            onChange={(e) => setProductNameEN(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="product_name_zh"
            label="Product Name (Chinese)"
            value={productNameZH}
            required={true}
            type="text"
            placeholder="Product Name (Chinese)"
            onChange={(e) => setProductNameZH(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"nowrap"}
            gap={2}
          >
            <FormPropsTextFields
              id="weight"
              label="Net Weight"
              value={weight.toString()}
              required={true}
              type="number"
              placeholder="Net Weight"
              onChange={(e) => setWeight(Number(e.target.value))}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0" }}
            />

            <DropdownMenu
              type="weight"
              weightUnit={weightUnit}
              setWeightUnit={setWeightUnit}
            />
          </Box>
        </Column>
        <Column>
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"nowrap"}
            gap={2}
          >
            <FormPropsTextFields
              id="case_quantity"
              label="Case Quantity"
              value={caseQuantity.toString()}
              required={true}
              type="number"
              placeholder="Case Quantity"
              onChange={(e) => setCaseQuantity(Number(e.target.value))}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0" }}
            />
            <DropdownMenu
              type="Case"
              caseUnit={caseUnit}
              setCaseUnit={setCaseUnit}
            />
          </Box>
          <FormPropsTextFields
            id="storage_requirements"
            label="Storage Requirements"
            value={storageRequirements}
            required={true}
            type="text"
            placeholder="Storage Requirements"
            onChange={(e) => setStorageRequirements(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />

          <FormPropsTextFields
            id="shelf_life"
            label="Shelf Life"
            value={shelfLife}
            required={true}
            type="text"
            placeholder="Shelf Life"
            onChange={(e) => setShelfLife(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="case_gtin"
            label="Case GTIN"
            value={caseGtin}
            required={true}
            type="text"
            placeholder="Case GTIN"
            onChange={(e) => setCaseGtin(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />
        </Column>
        <Column>
          <FormPropsTextFields
            id="ingredient_info"
            label="ingredient_info"
            value={ingredientInfo}
            required={true}
            type="text"
            rows={12}
            placeholder="Case GTIN"
            onChange={(e) => setIngredientInfo(e.target.value)}
            startIcon={null}
            sx={{ width: "100%", padding: "8px 0" }}
          />
          <Button btnText="Add New Label" onClick={createNewLabel} />
        </Column>
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
          <SendAnimation animationUrl={AnimationJson} />
        </>
      )}
    </Container>
  );
};

export default AddNew;
