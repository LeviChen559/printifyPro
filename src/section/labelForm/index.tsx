import React, { FC, FormEvent } from "react";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import { Column, Form } from "./style";
import Button from "@/components/button";
import { Box } from "@mui/material";
import DropdownMenu from "@/components/dropdownMenu";


interface iProps {
  createNewLabel?: (event: FormEvent<HTMLFormElement>) => void;
  updateLabel?: (event: FormEvent<HTMLFormElement>) => void;
  deleteLabel?: (id: number) => void;
  id?: number;
  logo: string;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
  itemCode: string;
  setItemCode: (value: string) => void;
  formError: {
    error: boolean;
    locale: string;
    message: string;
  };
  productNameEN: string;
  setProductNameEN: (value: string) => void;
  productNameZH: string;
  setProductNameZH: (value: string) => void;
  ingredientInfo: string;
  setIngredientInfo: (value: string) => void;
  weight: number;
  setWeight: (value: number) => void;
  weightUnit: string;
  setWeightUnit: React.Dispatch<React.SetStateAction<string>>;
  caseQuantity: number;
  setCaseQuantity: (value: number) => void;
  caseUnit: string;
  setCaseUnit: React.Dispatch<React.SetStateAction<string>>;
  caseGtin: string;
  setCaseGtin: (value: string) => void;
  manufacturedFor: string;
  setManufacturedFor: (value: string) => void;
  storageRequirements: string;
  setStorageRequirements: (value: string) => void;
  shelfLife: number;
  setShelfLife: (value: number) => void;
  isEditedView: boolean;
  labelSize: string;
  setLabelSize: React.Dispatch<React.SetStateAction<string>>;
}
const commonTextFieldStyles = {
  width: "100%",
  padding: 0,
  height: 40,
  background: "#ffffff40",
};
const LabelForm: FC<iProps> = (prop) => {

  return (
    <Form onSubmit={prop.isEditedView ? prop.updateLabel : prop.createNewLabel}>
      <Column height="85%">
      <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"nowrap"}
          gap={1}
          alignItems={"center"}
        >
           <DropdownMenu
          type="labelSize"
          labelSize={prop.labelSize}
          setLabelSize={prop.setLabelSize}
          error={prop.formError.error && prop.formError.locale === "labelSize"}
          helperText={
            prop.formError.error && prop.formError.locale === "labelSize"
              ? prop.formError.message
              : ""
          }
          width="100%"
        />
        <DropdownMenu
          type="logo"
          logo={prop.logo}
          setLogo={prop.setLogo}
          error={prop.formError.error && prop.formError.locale === "logo"}
          helperText={
            prop.formError.error && prop.formError.locale === "logo"
              ? prop.formError.message
              : ""
          }
          width="100%"
        />
        </Box>
        <FormPropsTextFields
          id="item_code"
          label="item_code"
          value={prop.itemCode}
          required={true}
          type="text"
          placeholder="item_code"
          background="#ffffff40"
          onChange={(e) => prop.setItemCode(e.target.value.toString())}
          startIcon={null}
          error={prop.formError.error && prop.formError.locale === "item_code"}
          helperText={
            prop.formError.error && prop.formError.locale === "item_code"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
        />
        <FormPropsTextFields
          id="product_name_en"
          label="Product Name (English)"
          value={prop.productNameEN}
          required={true}
          type="text"
          background="#ffffff40"
          placeholder="Product Name (English)"
          onChange={(e) => prop.setProductNameEN(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "product_name_en"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "product_name_en"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
        />
        <FormPropsTextFields
          id="product_name_zh"
          label="Product Name (Chinese)"
          value={prop.productNameZH}
          required={true}
          type="text"
          background="#ffffff40"
          placeholder="Product Name (Chinese)"
          onChange={(e) => prop.setProductNameZH(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "product_name_zh"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "product_name_zh"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"nowrap"}
          gap={1}
          alignItems={"center"}
        >
          <FormPropsTextFields
            id="Net_Weight"
            label="Net Weight"
            value={prop.weight.toString()}
            required={true}
            type="number"
            background="#ffffff40"
            placeholder="Net Weight"
            onChange={(e) => prop.setWeight(Number(e.target.value))}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "Net_Weight"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "Net_Weight"
                ? prop.formError.message
                : ""
            }
            sx={commonTextFieldStyles}
          />
          <DropdownMenu
            type="weight_unit"
            weightUnit={prop.weightUnit}
            setWeightUnit={prop.setWeightUnit}
            error={
              prop.formError.error && prop.formError.locale === "weight_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "weight_unit"
                ? prop.formError.message
                : ""
            }
            width="60%"
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"nowrap"}
          gap={1}
          alignItems={"center"}
        >
          <FormPropsTextFields
            id="case_quantity"
            label="Case Quantity"
            value={prop.caseQuantity.toString()}
            required={true}
            type="number"
            background="#ffffff40"
            placeholder="Case Quantity"
            onChange={(e) => prop.setCaseQuantity(Number(e.target.value))}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "case_quantity"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "case_quantity"
                ? prop.formError.message
                : ""
            }
            sx={commonTextFieldStyles}
          />
          <DropdownMenu
            type="case_unit"
            caseUnit={prop.caseUnit}
            setCaseUnit={prop.setCaseUnit}
            error={
              prop.formError.error && prop.formError.locale === "case_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "case_unit"
                ? prop.formError.message
                : ""
            }
            width="60%"
          />
        </Box>
        <Box display={"flex"} flexDirection={"row"} flexWrap={"nowrap"} gap={1}>
          <FormPropsTextFields
            id="storage_requirements"
            label="Storage Requirements"
            value={prop.storageRequirements}
            required={true}
            type="text"
            background="#ffffff40"
            placeholder="Storage Requirements"
            onChange={(e) => prop.setStorageRequirements(e.target.value)}
            startIcon={null}
            error={
              prop.formError.error &&
              prop.formError.locale === "storage_requirements"
            }
            helperText={
              prop.formError.error &&
              prop.formError.locale === "storage_requirements"
                ? prop.formError.message
                : ""
            }
            sx={commonTextFieldStyles}
          />
          <FormPropsTextFields
            id="shelf_life"
            label="Shelf Life"
            value={prop.shelfLife.toString()}
            required={true}
            type="number"
            background="#ffffff40"
            placeholder="Shelf Life"
            onChange={(e) => prop.setShelfLife(Number(e.target.value))}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "shelf_life"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "shelf_life"
                ? prop.formError.message
                : ""
            }
            sx={commonTextFieldStyles}
          />
        </Box>
        <FormPropsTextFields
          id="case_gtin"
          label="Case GTIN"
          value={prop.caseGtin}
          required={true}
          type="text"
          background="#ffffff40"
          placeholder="Case GTIN"
          onChange={(e) => prop.setCaseGtin(e.target.value)}
          startIcon={null}
          error={prop.formError.error && prop.formError.locale === "case_gtin"}
          helperText={
            prop.formError.error && prop.formError.locale === "case_gtin"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
        />
        <FormPropsTextFields
          id="ingredient_info"
          label="ingredient_info"
          value={prop.ingredientInfo}
          required={true}
          type="text"
          rows={10.5}
          background="#ffffff80"
          placeholder="Case GTIN"
          onChange={(e) => prop.setIngredientInfo(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "ingredient_info"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "ingredient_info"
              ? prop.formError.message
              : ""
          }
          sx={{ width: "100%", padding: 0 }}
        />
        <FormPropsTextFields
          id="manufacturedFor"
          label="ManufacturedFor"
          value={prop.manufacturedFor}
          required={true}
          type="text"
          rows={3}
          background="#ffffff80"
          placeholder="addresses"
          onChange={(e) => prop.setManufacturedFor(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "manufacturedFor"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "manufacturedFor"
              ? prop.formError.message
              : ""
          }
          sx={{ width: "100%", padding: 0 }}
        />
      </Column>
      <Column
        height="auto"
        position="relative"
        overflowY="hidden"
        padding="4px 0"
      >
        {prop.isEditedView ? (
          <Button btnText="Update Label" type="submit" />
        ) : (
          <Button btnText="Create Label" type="submit" />
        )}
        {prop.isEditedView && (
          <Button
            btnText="Delete Label"
            type="button"
            backgroundColor={"#ff000080"}
            onClick={() =>
              prop.deleteLabel && prop.deleteLabel(prop.id as number)
            }
          />
        )}
      </Column>
    </Form>
  );
};

export default LabelForm;
