import React, { forwardRef,Dispatch,SetStateAction } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
} from "./style";
import { iLabelInfo } from "@/type/labelType";
import { Typography } from "@mui/material";
import Barcode from "react-barcode";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import DropdownMenu from "@/components/dropdownMenu";
import { iEditedMode, iLabelStyle, iTextStyle } from "@/type/labelType";
import LabelLogo from "@/components/logo";

interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> | undefined;
  setProductNameEN?: Dispatch<SetStateAction<string>>;
  setProductNameZH?: Dispatch<SetStateAction<string>>;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: Dispatch<SetStateAction<string>>;
  ingredientInfo?: string;
  setWeight?: Dispatch<SetStateAction<number>>;
  weight?: number;
  setManufacturedFor?: Dispatch<SetStateAction<string>>;
  caseQuantity?: number;
  setCaseQuantity?: Dispatch<SetStateAction<number>>;
  caseUnit?: string;
  setCaseUnit?: Dispatch<SetStateAction<string>>;
  manufacturedFor?: string;
  setWeightUnit?: Dispatch<SetStateAction<string>>;
  setStorageRequirements?: Dispatch<SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  weightStyle?: iTextStyle;
  ingredientInfoStyle?: iTextStyle;
  manufacturedForStyle?: iTextStyle;
  storageRequirementsStyle?: iTextStyle;
  weightUnitStyle?: iTextStyle;
  defaultLabelStyle: iLabelStyle;
  logo: string;
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  const now = new Date();
  const bestByValue = new Date(
    now.getTime() + prop.labelInfo.shelf_life * 24 * 60 * 60 * 1000
  );
  const formattedDate =
    String(bestByValue.getDate()).padStart(2, "0") +
    "/" +
    String(bestByValue.getMonth() + 1).padStart(2, "0") +
    "/" +
    bestByValue.getFullYear();

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <LabelLogo logo={prop.logo} fontSize={48} />
        <div style={{ height: "auto", width: "55%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameEn)
            }
            name="product_name_en"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px",
              background: "transparent",
              fontSize: prop.productNameENStyle
                ? prop.productNameENStyle.fontSize
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontSize,
              fontFamily: prop.productNameENStyle
                ? prop.productNameENStyle.fontFamily
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontFamily,
              color: prop.productNameENStyle && prop.productNameENStyle.color,
              fontStyle: prop.productNameENStyle
                ? prop.productNameENStyle.fontStyle
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_en.fontStyle,
              fontWeight: prop.productNameENStyle
                ? prop.productNameENStyle.fontWeight
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.product_name_en.fontWeight,
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Allows text to wrap to the next line
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.2", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.productNameEN}
            onChange={(e) => {
              prop.setProductNameEN && prop.setProductNameEN(e.target.value);
            }}
          />
        </div>
        <div style={{ height: "auto", width: "30%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.productNameZh)
            }
            name="product_name_zh"
            style={{
              padding: "0px",
              display: "flex",
              alignItems: "center",
              background: "transparent",
              fontSize: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontSize
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontSize,
              fontFamily: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontFamily
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontFamily,
              color: prop.productNameZHStyle && prop.productNameZHStyle.color,
              fontStyle: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontStyle
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontStyle,
              fontWeight: prop.productNameZHStyle
                ? prop.productNameZHStyle.fontWeight
                : prop.defaultLabelStyle &&
                  prop.defaultLabelStyle.product_name_zh.fontWeight,
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            value={prop.productNameZH}
            onChange={(e) =>
              prop.setProductNameZH && prop.setProductNameZH(e.target.value)
            }
          />
        </div>
      </Header>
      <Ingredients>
        <Typography width={"100%"}>Ingredients:</Typography>
        <div style={{ width: "100%", overflow: "hidden", height: 64 }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() =>
              prop.setEditMode && prop.setEditMode(iEditedMode.ingredientInfo)
            }
            style={{
              width: "100%",
              height: "100%",
              padding: "0px",
              margin: "0px",
              fontSize: prop.ingredientInfoStyle
                ? prop.ingredientInfoStyle.fontSize
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient_info.fontSize,
              fontFamily: prop.ingredientInfoStyle
                ? prop.ingredientInfoStyle.fontFamily
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient_info.fontFamily,
              color: prop.ingredientInfoStyle
                ? prop.ingredientInfoStyle.color
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient_info.color,
              fontStyle: prop.ingredientInfoStyle
                ? prop.ingredientInfoStyle.fontStyle
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient_info.fontStyle,
              fontWeight: prop.ingredientInfoStyle
                ? prop.ingredientInfoStyle.fontWeight
                : prop.defaultLabelStyle &&
                 prop.defaultLabelStyle.ingredient_info.fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.35", // Adjust for consistent spacing
              border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
              borderRadius: prop.isEditedMode ? "4px" : "none",
            }}
            rows={2}
            placeholder="ingredientInfo"
            value={prop.ingredientInfo}
            onChange={(e) => {
              prop.setIngredientInfo && prop.setIngredientInfo(e.target.value);
            }}
          />
        </div>
      </Ingredients>
      <InfomationWrapper>
        <InfomationColumn flex={1.75}>
          {/* <Typography variant="body2">
            Contains :&quot;&quot;&quot;&quot;
          </Typography> */}
          <Row>
            <Typography variant="body2" noWrap>
              Net Weight :
            </Typography>
            <EditText
              name="weight"
              type="number"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: prop.weightStyle
                  ? prop.weightStyle.fontSize
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontSize,
                fontFamily: prop.weightStyle
                  ? prop.weightStyle.fontFamily
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontFamily,
                color: prop.weightStyle
                  ? prop.weightStyle.color
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.color,
                fontStyle: prop.weightStyle
                  ? prop.weightStyle.fontStyle
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontStyle,
                fontWeight: prop.weightStyle
                  ? prop.weightStyle.fontWeight
                  : prop.defaultLabelStyle &&
                   prop.defaultLabelStyle.weight.fontWeight,
                background: "transparent",
                width: 50,
                minHeight: 24,
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              value={prop.weight ? prop.weight.toString() : "0"}
              onChange={(e) =>
                prop.setWeight && prop.setWeight(Number(e.target.value))
              }
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.weight)
              }
            />
            <DropdownMenu
              type="weight_unit"
              value={prop.weightUnit as string}
              onChange={prop.setWeightUnit as (value: string) => void}
              width={50}
              readOnly={!prop.isEditedMode}
              isOnLabelCard={true}
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.weightUnit)
              }
            />
              <EditText
          name="case_quantity"
          type="number"
          style={{
            fontSize:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontSize,
            fontFamily:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontFamily,
            color:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.color,
            fontStyle:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontStyle,
            fontWeight:
              prop.defaultLabelStyle &&
              prop.defaultLabelStyle.case_quantity.fontWeight,
            background: "transparent",
            width: prop.isEditedMode ? 55 : "auto",
            minHeight: 24,
            border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
            borderRadius: prop.isEditedMode ? "4px" : "none",
          }}
          value={prop.caseQuantity ? prop.caseQuantity.toString() : "0"}
          onChange={(e) =>
            prop.setWeight && prop.setWeight(Number(e.target.value))
          }
        />
        <DropdownMenu
          type="case_unit"
          value={prop.caseUnit as string}
          onChange={prop.setCaseUnit as (value: string) => void}
          width={prop.isEditedMode ? 85 : 50}
          readOnly={!prop.isEditedMode}
          isOnLabelCard={true}
        />
          </Row>
          <Row>
            <Typography variant="body2" noWrap>
           Storage Requirements :
            </Typography>
            <EditText
              readonly={!prop.isEditedMode}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: "4px 0",
                fontSize: prop.storageRequirementsStyle
                  ? prop.storageRequirementsStyle.fontSize
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements
                      .fontSize,
                fontFamily: prop.storageRequirementsStyle
                  ? prop.storageRequirementsStyle.fontFamily
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements
                      .fontFamily,
                color: prop.storageRequirementsStyle
                  ? prop.storageRequirementsStyle.color
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements
                      .color,
                fontStyle: prop.storageRequirementsStyle
                  ? prop.storageRequirementsStyle.fontStyle
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements
                      .fontStyle,
                fontWeight: prop.storageRequirementsStyle
                  ? prop.storageRequirementsStyle.fontWeight
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.storage_requirements
                      .fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="storage_requirements"
              value={prop.labelInfo.storage_requirements}
              onChange={(e) =>
                prop.setStorageRequirements &&
                prop.setStorageRequirements(e.target.value)
              }
              onEditMode={() =>
                prop.setEditMode && prop.setEditMode(iEditedMode.storageRequirements)
              }
            />
          </Row>
          <Typography variant="body2">Manufactured For:</Typography>
          <div style={{ width: "100%", height: 44 }}>
            <EditTextarea
              readonly={!prop.isEditedMode}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                fontSize: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontSize
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured_for
                      .fontSize,
                fontFamily: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontFamily
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured_for
                      .fontFamily,
                color: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.color
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured_for.color,
                fontStyle: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontStyle
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured_for
                      .fontStyle,
                fontWeight: prop.manufacturedForStyle
                  ? prop.manufacturedForStyle.fontWeight
                  : prop.defaultLabelStyle &&
                    prop.defaultLabelStyle.manufactured_for
                      .fontWeight,
                background: "transparent",
                overflow: "hidden", // Hide scrollbar for a clean look
                whiteSpace: "pre-line", // Ensures text wraps correctly
                overflowWrap: "break-word", // Breaks long words if necessary
                resize: "none", // Prevents resizing to maintain consistent font size view
                lineHeight: "1.25", // Adjust for consistent spacing
                border: prop.isEditedMode ? "1px solid #bcbcbc80" : "none",
                borderRadius: prop.isEditedMode ? "4px" : "none",
              }}
              placeholder="I am an editable textarea"
              rows={1.25}
              value={prop.manufacturedFor}
              onChange={(e) =>
                prop.setManufacturedFor &&
                prop.setManufacturedFor(e.target.value)
              }
              onEditMode={() =>
                prop.setEditMode &&
                prop.setEditMode(iEditedMode.manufacturedFor)
              }
            />
          </div>
        </InfomationColumn>
        <InfomationColumn flex={1}>
          <Typography variant="body2">
            LOT #{prop.labelInfo.item_code}
          </Typography>
          <Typography variant="body2">BEST BY : {formattedDate}</Typography>
          <Barcode
            value={prop.labelInfo.case_gtin.substring(0, 11) ?? "111111111111"}
            width={2}
            height={50}
            fontSize={14}
            format="UPC"
          />
        </InfomationColumn>
      </InfomationWrapper>
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
