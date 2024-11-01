import React, { FC, useState, useRef } from "react";
import { Container, View, Print, Options,Column } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/components/labelTable";
import LabelCard from "@/components/labelCard";
import Button from "@/components/button";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import { Box } from "@mui/material";
import DropdownMenu from "@/components/dropdownMenu";

interface iProps {
  selectLabelInfo: iLabelInfo;
  setShowCard: React.Dispatch<
    React.SetStateAction<{
      labelActionCard: boolean;
      labelPrintCard: boolean;
      labelEditCard: boolean;
    }>
  >;
}

const LabelActionCard: FC<iProps> = (prop) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [itemCode, setItemCode] = useState<string>(
    prop.selectLabelInfo.item_code
  );
  const [productNameEN, setProductNameEN] = useState<string>(
    prop.selectLabelInfo.product_name_en
  );
  const [productNameZH, setProductNameZH] = useState<string>(
    prop.selectLabelInfo.product_name_zh
  );
  const [weight, setWeight] = useState<number>(
    prop.selectLabelInfo.weight
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
  const [caseGtin, setCaseGtin] = useState<string>("code-128");
  const [ingredientInfo, setIngredientInfo] = useState<string>(
    prop.selectLabelInfo.ingredient_info
  );

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
  };

  return (
    <Container>
      <CancelRoundedIcon
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
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
          }))
        }
      />
      <View>
        <LabelCard
          ref={contentRef}
          labelInfo={lableInput}
          showProductNameEN={true}
          showProductNameZH={true}
          isEditedMode={true}
        />
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
        </Column>
        </Options>

        <Button btnText="Update the Label" onClick={() => {}} type="button" />
      </Print>
    </Container>
  );
};

export default LabelActionCard;
