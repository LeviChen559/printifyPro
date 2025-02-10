import React, { FC, FormEvent, Dispatch, SetStateAction } from "react";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import { Column, Form } from "./style";
import Button from "@/components/button";
import { Box } from "@mui/material";
import DropdownMenu from "@/components/dropdownMenu";
import { iEditedMode } from "@/type/labelType";

interface iProps {
  createNewLabel?: (event: FormEvent<HTMLFormElement>) => void;
  updateLabel?: (event: FormEvent<HTMLFormElement>) => void;
  deleteLabel?: (id: number) => void;
  id?: number;
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
  itemCode: string;
  setItemCode: Dispatch<SetStateAction<string>>;
  customerItemCode: string;
  setCustomerItemCode: Dispatch<SetStateAction<string>>;
  lotNumber: string;
  setLotNumber: Dispatch<SetStateAction<string>>;
  formError: {
    error: boolean;
    locale: string;
    message: string;
  };
  productNameEN: string;
  setProductNameEN: Dispatch<SetStateAction<string>>;
  productNameZH: string;
  setProductNameZH: Dispatch<SetStateAction<string>>;
  ingredient: string;
  setIngredient: Dispatch<SetStateAction<string>>;
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  caseQuantity: number;
  setCaseQuantity: Dispatch<SetStateAction<number>>;
  caseUnit: string;
  setCaseUnit: Dispatch<SetStateAction<string>>;
  caseGtin: string;
  setCaseGtin: Dispatch<SetStateAction<string>>;
  manufactured: string;
  setManufactured: Dispatch<SetStateAction<string>>;
  storage: string;
  setStorage: Dispatch<SetStateAction<string>>;
  shelfLife: string;
  setShelfLife: Dispatch<SetStateAction<string>>;
  isEditedView: boolean;
  labelTemp: string;
  setLabelTemp: Dispatch<SetStateAction<string>>;
  allergen: string;
  setAllergen: Dispatch<SetStateAction<string>>;
  editMode: iEditedMode;
  setEditMode: Dispatch<SetStateAction<iEditedMode>>;
}
const LabelForm: FC<iProps> = (prop) => {
  const commonTextFieldStyles = (mode: iEditedMode) => {
    return {
      width: "100%",
      padding: 0,
      height: 40,
      background: mode === prop.editMode ? "pink" : "#ffffff40",
    };
  };

  return (
    <Form onSubmit={prop.isEditedView ? prop.updateLabel : prop.createNewLabel} >
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
            value={prop.labelTemp}
            onChange={prop.setLabelTemp}
            error={
              prop.formError.error && prop.formError.locale === "labelSize"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "labelSize"
                ? prop.formError.message
                : ""
            }
            width="100%"
          />
          <DropdownMenu
            type="logo"
            value={prop.logo}
            onChange={prop.setLogo}
            error={prop.formError.error && prop.formError.locale === "logo"}
            helperText={
              prop.formError.error && prop.formError.locale === "logo"
                ? prop.formError.message
                : ""
            }
            width="100%"
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
            id="item_code"
            label="item_code"
            value={prop.itemCode}
            required={true}
            type="text"
            placeholder="item_code"
            background="#ffffff40"
            onChange={(e) => prop.setItemCode(e.target.value.toString())}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "item_code"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "item_code"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.itemCode)}
            sx={commonTextFieldStyles(iEditedMode.itemCode)}
          />
          <FormPropsTextFields
            id="Customer_item_code"
            label="Customer_item_code"
            value={prop.customerItemCode}
            required={false}
            type="text"
            placeholder="customer_item_code"
            background="#ffffff40"
            onChange={(e) =>
              prop.setCustomerItemCode(e.target.value.toString())
            }
            startIcon={null}
            error={
              prop.formError.error &&
              prop.formError.locale === "Customer_item_code"
            }
            helperText={
              prop.formError.error &&
              prop.formError.locale === "Customer_item_code"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.customerCode)}
            sx={commonTextFieldStyles(iEditedMode.customerCode)}
          />
          <FormPropsTextFields
            id="Lot_number"
            label="Lot_number"
            value={prop.lotNumber}
            required={false}
            type="text"
            placeholder="lot_Number"
            background="#ffffff40"
            onChange={(e) => prop.setLotNumber(e.target.value.toString())}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "Lot_number"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "Lot_number"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.lotNumber)}
            sx={commonTextFieldStyles(iEditedMode.lotNumber)}

          />
        </Box>
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
          onClick={() => prop.setEditMode(iEditedMode.productNameEn)}
          error={
            prop.formError.error && prop.formError.locale === "product_name_en"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "product_name_en"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles(iEditedMode.productNameEn)}
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
          onClick={() => prop.setEditMode(iEditedMode.productNameZh)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "product_name_zh"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "product_name_zh"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles(iEditedMode.productNameZh)}

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
            value={prop.weight}
            required={true}
            type="text"
            background="#ffffff40"
            placeholder="Net Weight"
            onChange={(e) => prop.setWeight(e.target.value)}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "Net_Weight"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "Net_Weight"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.weight)}
            sx={commonTextFieldStyles(iEditedMode.weight)}
          />
          {/* <DropdownMenu
            type="weight_unit"
            value={prop.weightUnit}
            onChange={prop.setWeightUnit}
            error={
              prop.formError.error && prop.formError.locale === "weight_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "weight_unit"
                ? prop.formError.message
                : ""
            }
            width="60%"
          /> */}
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
            onClick={() => prop.setEditMode(iEditedMode.caseQuantity)}
            sx={commonTextFieldStyles(iEditedMode.caseQuantity)}
          />
          <FormPropsTextFields
            id="case_unit"
            label="Case Unit"
            value={prop.caseUnit}
            required={true}
            type="string"
            background="#ffffff40"
            placeholder="Case Unit"
            onChange={(e) => prop.setCaseUnit(e.target.value)}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "case_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "case_unit"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.caseUnit)}
            sx={commonTextFieldStyles(iEditedMode.caseUnit)}
          />
          {/* <DropdownMenu
            type="case_unit"
            value={prop.caseUnit}
            onChange={prop.setCaseUnit}
            error={
              prop.formError.error && prop.formError.locale === "case_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "case_unit"
                ? prop.formError.message
                : ""
            }
            width="60%"
          /> */}
        </Box>
        <Box display={"flex"} flexDirection={"row"} flexWrap={"nowrap"} gap={1}>
          <FormPropsTextFields
            id="storage"
            label="Storage"
            value={prop.storage}
            required={true}
            type="string"
            background="#ffffff40"
            placeholder="Freezer/Coooler"
            onChange={(e) => prop.setStorage(e.target.value)}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "case_unit"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "case_unit"
                ? prop.formError.message
                : ""
            }
            onClick={() => prop.setEditMode(iEditedMode.storage)}
            sx={commonTextFieldStyles(iEditedMode.storage)}
          />
          {/* <DropdownMenu
            type="storage"
            value={prop.storage}
            onChange={prop.setStorage}
            error={
              prop.formError.error && prop.formError.locale === "storage"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "storage"
                ? prop.formError.message
                : ""
            }
            width="60%"
          /> */}
          <FormPropsTextFields
            id="shelf_life"
            label="Shelf Life"
            value={prop.shelfLife}
            required={true}
            type="string"
            background="#ffffff40"
            placeholder="Shelf Life"
            onChange={(e) => prop.setShelfLife(e.target.value)}
            startIcon={null}
            error={
              prop.formError.error && prop.formError.locale === "shelf_life"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "shelf_life"
                ? prop.formError.message
                : ""
            }
            sx={commonTextFieldStyles(iEditedMode.storage)}
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
          sx={commonTextFieldStyles(iEditedMode.storage)}
        />
        <FormPropsTextFields
          id="ingredient"
          label="ingredient"
          value={prop.ingredient}
          required={true}
          type="text"
          rows={8}
          background="#ffffff80"
          placeholder="Case GTIN"
          onChange={(e) => prop.setIngredient(e.target.value)}
          onClick={() => prop.setEditMode(iEditedMode.ingredient)}
          startIcon={null}
          error={prop.formError.error && prop.formError.locale === "ingredient"}
          helperText={
            prop.formError.error && prop.formError.locale === "ingredient"
              ? prop.formError.message
              : ""
          }
          sx={{ width: "100%", padding: 0,background:prop.editMode === iEditedMode.ingredient ? "pink" : "#ffffff40" }}
        />
        <FormPropsTextFields
          id="allergen"
          label="allergen"
          value={prop.allergen}
          required={false}
          type="text"
          rows={2}
          background="#ffffff80"
          placeholder="allergen"
          onChange={(e) => prop.setAllergen(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "allergen"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "allergen"
              ? prop.formError.message
              : ""
          }
          onClick={() => prop.setEditMode(iEditedMode.allergen)}
          sx={{ width: "100%", padding: 0,background:prop.editMode === iEditedMode.allergen ? "pink" : "#ffffff40" }}
        />
        <FormPropsTextFields
          id="manufactured"
          label="Manufactured"
          value={prop.manufactured}
          required={false}
          type="text"
          rows={2}
          background="#ffffff80"
          placeholder="addresses"
          onChange={(e) => prop.setManufactured(e.target.value)}
          startIcon={null}
          error={
            prop.formError.error && prop.formError.locale === "manufactured"
          }
          helperText={
            prop.formError.error && prop.formError.locale === "manufactured"
              ? prop.formError.message
              : ""
          }
          onClick={() => prop.setEditMode(iEditedMode.manufactured)}
          sx={{ width: "100%", padding: 0,background:prop.editMode === iEditedMode.manufactured ? "pink" : "#ffffff40" }}
        />
      </Column>
      <Column
        height="auto"
        position="relative"
        overflowY="hidden"
        padding="4px 0"
      >
        {prop.isEditedView ? (
          <Button btnText="Update Label" type="submit"  />
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
