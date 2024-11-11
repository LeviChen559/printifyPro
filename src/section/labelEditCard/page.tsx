"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { Container, View, Print, Info, Column } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/components/labelTable";
import LabelCard from "@/components/labelCard";
import Button from "@/components/button";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import { Box } from "@mui/material";
import DropdownMenu from "@/components/dropdownMenu";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import LottieAnimation from "@/components/lottie/send";
import AnimationJson from "@/components/lottie/delete.json";
import StylePanel from "@/components/stylePanel";
import useSWR from "swr";

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
  best_before: iTextStyle;
}
const LabelActionCard: FC<iProps> = (prop) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: labelStyle } = useSWR(
    prop.selectLabelInfo?.id
      ? `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`
      : null,
    fetcher
  );
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLabelUpdating, setIsLabelUpdating] = useState<boolean>(false);
  const [isLabelDeleted, setIsLabelDeleted] = useState<boolean>(false);
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
  const [weightUnit, setWeightUnit] = useState<string>(
    prop.selectLabelInfo.weight_unit
  );
  const [caseQuantity, setCaseQuantity] = useState<number>(
    prop.selectLabelInfo.case_quantity
  );
  const [caseUnit, setCaseUnit] = useState<string>(
    prop.selectLabelInfo.case_unit
  );
  const [storageRequirements, setStorageRequirements] = useState<string>(
    prop.selectLabelInfo.storage_requirements
  );
  const [shelfLife, setShelfLife] = useState<string>(
    prop.selectLabelInfo.shelf_life
  );
  const [caseGtin, setCaseGtin] = useState<string>(
    prop.selectLabelInfo.case_gtin
  );
  const [ingredientInfo, setIngredientInfo] = useState<string>(
    prop.selectLabelInfo.ingredient_info
  );
  const [manufacturedFor, setManufacturedFor] = useState<string>(
    prop.selectLabelInfo.manufactured_for
  );
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);

  const lableInput = {
    id: prop.selectLabelInfo.id,
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
  };
  useEffect(() => {
    if (labelStyle?.data?.[0]?.product_name_en) {
      setProductNameENStyle({
        color: labelStyle.data[0].product_name_en.color ?? "#000000",
        fontStyle: labelStyle.data[0].product_name_en.fontStyle ?? "Normal",
        fontSize: labelStyle.data[0].product_name_en.fontSize ?? 24,
        fontFamily: labelStyle.data[0].product_name_en.fontFamily ?? "Arial",
        fontWeight: labelStyle.data[0].product_name_en.fontWeight ?? 700,
      });
      setProductNameZHStyle({
        color: labelStyle.data[0].product_name_zh.color?? "#000000",
        fontStyle: labelStyle.data[0].product_name_zh.fontStyle?? "Normal",
        fontSize: labelStyle.data[0].product_name_zh.fontSize?? 24,
        fontFamily: labelStyle.data[0].product_name_zh.fontFamily?? "Arial",
        fontWeight: labelStyle.data[0].product_name_zh.fontWeight?? 700,
      })
    }
  }, [labelStyle]);

  const labelStyleuUpdates ={
    id: prop.selectLabelInfo.id,
    item_code:{
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
    },
    product_name_en: {
      color: productNameENStyle.color,
      fontStyle: productNameENStyle.fontStyle,
      fontSize: productNameENStyle.fontSize,
      fontFamily: productNameENStyle.fontFamily,
      fontWeight: productNameENStyle.fontWeight,
    },
    product_name_zh: {
      color:productNameZHStyle.color,
      fontStyle: productNameZHStyle.fontStyle,
      fontSize: productNameZHStyle.fontSize,
      fontFamily: productNameZHStyle.fontFamily,
      fontWeight: productNameZHStyle.fontWeight,
    },
    ingredient_info: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
    },
    weight: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize:14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  weight_unit: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  storage_requirements: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  manufactured_for: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  case_quantity: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  case_unit: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  best_before: {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
  },
  };
  

  const updateLabel = async (labelInfo: iLabelInfo,labelStyle:ILabelStyle) => {
    console.log("Updating label with info:", labelInfo);
    setIsLabelUpdating(true);
    try {
      const res = await axios.patch("/api/prisma/updateLabel", {labelInfo,labelStyle});
      console.log("Response from server:", res);
      if (res.data.success) {
        setIsLabelUpdating(true);
        try {
          const res = await axios.post("/api/prisma/addNewActive", {
            event: "update label",
            username: prop.userName,
            role: prop.userRole,
            label_code: labelInfo.item_code,
          });

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
  console.log("editMode", editMode);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataType: iEditedMode,
    styleType: iTextStyleMode
  ) => {
    if (dataType === iEditedMode.productNameEn) {
      const value = styleType === iTextStyleMode.fontSize || styleType === iTextStyleMode.fontWeight
        ? Number(event.target.value) // Convert to number for fontSize or fontWeight
        : event.target.value; // Keep as string for other properties
  
      setProductNameENStyle((prevStyle) => ({
        ...prevStyle,
        [styleType]: value, // Dynamically update the style property based on styleType
      }));
    }else if(dataType === iEditedMode.productNameZh){
      const value = styleType === iTextStyleMode.fontSize || styleType === iTextStyleMode.fontWeight
        ? Number(event.target.value) // Convert to number for fontSize or fontWeight
        : event.target.value; // Keep as string for other properties
  
      setProductNameZHStyle((prevStyle) => ({
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
  if (!labelStyle) {
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
       handleChange={handleChange}
        />
         
       
        {isLabelUpdating ? (
          <CircularProgress />
        ) : (
          <LabelCard
            ref={contentRef}
            labelInfo={lableInput}
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
            setManufacturedFor={setManufacturedFor}
            manufacturedFor={manufacturedFor}
            setWeightUnit={setWeightUnit}
            weightUnit={weightUnit}
            editMode={editMode}
            setEditMode={setEditMode}
            productNameENStyle={productNameENStyle}
            productNameZHStyle={productNameZHStyle}
          />
        )}
      </View>
      <Print>
        <Info>
          <Column>
            <FormPropsTextFields
              readOnly
              id="item_code"
              label="item_code"
              value={itemCode}
              required={true}
              type="text"
              placeholder="item_code"
              onChange={(e) => setItemCode(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0", height: 50 }}
            />
            <FormPropsTextFields
              readOnly
              id="product_name_en"
              label="Product Name (English)"
              value={productNameEN}
              required={true}
              type="text"
              placeholder="Product Name (English)"
              onChange={(e) => setProductNameEN(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0", height: 50 }}
            />
            <FormPropsTextFields
              readOnly
              id="product_name_zh"
              label="Product Name (Chinese)"
              value={productNameZH}
              required={true}
              type="text"
              placeholder="Product Name (Chinese)"
              onChange={(e) => setProductNameZH(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0", height: 50 }}
            />
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"nowrap"}
              gap={1}
              alignItems={"center"}
            >
              <FormPropsTextFields
                readOnly
                id="weight"
                label="Net Weight"
                value={weight.toString()}
                required={true}
                type="number"
                placeholder="Net Weight"
                onChange={(e) => setWeight(Number(e.target.value))}
                startIcon={null}
                sx={{ width: "100%", padding: "8px 0", height: 50 }}
              />
              <DropdownMenu
                readOnly
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
              gap={1}
              alignItems={"center"}
            >
              <FormPropsTextFields
                readOnly
                id="case_quantity"
                label="Case Quantity"
                value={caseQuantity.toString()}
                required={true}
                type="number"
                placeholder="Case Quantity"
                onChange={(e) => setCaseQuantity(Number(e.target.value))}
                startIcon={null}
                sx={{ width: "100%", padding: "8px 0", height: 50 }}
              />
              <DropdownMenu
                readOnly
                type="Case"
                caseUnit={caseUnit}
                setCaseUnit={setCaseUnit}
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"nowrap"}
              gap={1}
            >
              <FormPropsTextFields
                readOnly
                id="storage_requirements"
                label="Storage Requirements"
                value={storageRequirements}
                required={true}
                type="text"
                placeholder="Storage Requirements"
                onChange={(e) => setStorageRequirements(e.target.value)}
                startIcon={null}
                sx={{ width: "100%", padding: "8px 0", height: 50 }}
              />
              <FormPropsTextFields
                readOnly
                id="shelf_life"
                label="Shelf Life"
                value={shelfLife}
                required={true}
                type="text"
                placeholder="Shelf Life"
                onChange={(e) => setShelfLife(e.target.value)}
                startIcon={null}
                sx={{ width: "100%", padding: "8px 0", height: 50 }}
              />
            </Box>
            <FormPropsTextFields
              id="case_gtin"
              label="Case GTIN"
              value={caseGtin}
              required={true}
              type="text"
              placeholder="Case GTIN"
              onChange={(e) => setCaseGtin(e.target.value)}
              startIcon={null}
              background="#ffffff"
              sx={{ width: "100%", padding: "8px 0", height: 50 }}
            />
          </Column>
          <Column>
            <FormPropsTextFields
              id="ingredient_info"
              label="ingredient_info"
              value={ingredientInfo}
              required={true}
              type="text"
              rows={3}
              placeholder="Case GTIN"
              onChange={(e) => setIngredientInfo(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0", height: "100%" }}
            />
          </Column>
        </Info>
        <Column>
          <Button
            btnText="Delete the Label"
            onClick={() => deleteLabel(lableInput.id)}
            type="button"
            backgroundColor="#ff0000"
            width="100%"
          />
          <Button
            btnText="Update the Label"
            onClick={() => updateLabel(lableInput,labelStyleuUpdates)}
            type="button"
            width="100%"
          />
        </Column>
      </Print>
    </Container>
  );
};

export default LabelActionCard;
