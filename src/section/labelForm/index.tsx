import React, { FC, FormEvent,Dispatch,SetStateAction } from "react";
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
  ingredientInfo: string;
  setIngredientInfo: Dispatch<SetStateAction<string>>;
  weight: number;
  setWeight: Dispatch<SetStateAction<number>>;
  weightUnit: string;
  setWeightUnit: Dispatch<SetStateAction<string>>;
  caseQuantity: number;
  setCaseQuantity: Dispatch<SetStateAction<number>>;
  caseUnit: string;
  setCaseUnit: Dispatch<SetStateAction<string>>;
  caseGtin: string;
  setCaseGtin: Dispatch<SetStateAction<string>>;
  manufacturedFor: string;
  setManufacturedFor: Dispatch<SetStateAction<string>>;
  storageRequirements: string;
  setStorageRequirements: Dispatch<SetStateAction<string>>;
  shelfLife: number;
  setShelfLife: Dispatch<SetStateAction<number>>;
  isEditedView: boolean;
  labelSize: string;
  setLabelSize: Dispatch<SetStateAction<string>>;
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
          value={prop.labelSize}
          onChange={prop.setLabelSize}
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
         alignItems={"center"}>
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
          id="Customer_item_code"
          label="Customer_item_code"
          value={prop.customerItemCode}
          required={true}
          type="text"
          placeholder="customer_item_code"
          background="#ffffff40"
          onChange={(e) => prop.setCustomerItemCode(e.target.value.toString())}
          startIcon={null}
          error={prop.formError.error && prop.formError.locale === "Customer_item_code"}
          helperText={
            prop.formError.error && prop.formError.locale === "Customer_item_code"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
        />
         <FormPropsTextFields
          id="Lot_number"
          label="Lot_number"
          value={prop.lotNumber}
          required={true}
          type="text"
          placeholder="lot_Number"
          background="#ffffff40"
          onChange={(e) => prop.setLotNumber(e.target.value.toString())}
          startIcon={null}
          error={prop.formError.error && prop.formError.locale === "Lot_number"}
          helperText={
            prop.formError.error && prop.formError.locale === "Lot_number"
              ? prop.formError.message
              : ""
          }
          sx={commonTextFieldStyles}
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
          />
        </Box>
        <Box display={"flex"} flexDirection={"row"} flexWrap={"nowrap"} gap={1}>
        <DropdownMenu
            type="storage_requirements"
            value={prop.storageRequirements}
            onChange={prop.setStorageRequirements}
            error={
              prop.formError.error && prop.formError.locale === "storage_requirements"
            }
            helperText={
              prop.formError.error && prop.formError.locale === "storage_requirements"
                ? prop.formError.message
                : ""
            }
            width="60%"
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
