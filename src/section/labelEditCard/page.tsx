"use client";
import React, { FC, useState, useRef } from "react";
import { Container, View, Print, Options, Column, Row } from "./style";
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

const LabelActionCard: FC<iProps> = (prop) => {
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
  const [productNameZH, setProductNameZH] = useState<string>(
    prop.selectLabelInfo.product_name_zh
  );
  const [weight, setWeight] = useState<number>( Number(prop.selectLabelInfo.weight));
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

  console.log("weight",weight)
  

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
    manufactured_for: manufacturedFor
  };
  console.log("lableInput", lableInput);

  const updateLabel = async (labelInfo: iLabelInfo) => {
    console.log("Updating label with info:", labelInfo);
    setIsLabelUpdating(true);
    try {
      const res = await axios.patch("/api/prisma/updateLabel", labelInfo);
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
  if (isLabelDeleted) {
    return (
      <Container>
      <LottieAnimation text="Label is Deleted!" animationUrl={AnimationJson} />
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

          />
        )}
      </View>
      <Print>
        <Options>
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
                value={prop.selectLabelInfo.id.toString()}
                required={true}
                type="number"
                placeholder=""
                readOnly={true}
                onChange={(e) => console.log(Number(e.target.value))}
                startIcon={null}
                sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
                sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
              sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
              sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
                sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
                sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
              sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
              sx={{ width: "100%", padding: "8px 0", height: 60 }}
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
              sx={{ width: "100%", padding: "8px 0", height: 60 }}
            />
          </Column>
          <Column>
            <FormPropsTextFields
              id="ingredient_info"
              label="ingredient_info"
              value={ingredientInfo}
              required={true}
              type="text"
              rows={10.5}
              placeholder="Case GTIN"
              onChange={(e) => setIngredientInfo(e.target.value)}
              startIcon={null}
              sx={{ width: "100%", padding: "8px 0", height: "100%" }}
            />
          </Column>
        </Options>
        <Row>
          <Button
            btnText="Delete the Label"
            onClick={() => deleteLabel(lableInput.id)}
            type="button"
            backgroundColor="#ff0000"
          />
          <Button
            btnText="Update the Label"
            onClick={() => updateLabel(lableInput)}
            type="button"
          />
        </Row>
      </Print>
    </Container>
  );
};

export default LabelActionCard;
