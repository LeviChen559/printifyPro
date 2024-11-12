import React, { forwardRef } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
  Row,
} from "./style";
import { iLabelInfo } from "../labelTable";
import { Typography } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Barcode from "react-barcode";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import DropdownMenu from "@/components/dropdownMenu";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { iEditedMode ,ILabelStyle,iTextStyle} from "@/type/labelType";


interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> | undefined;
  setProductNameEN?: (value: string) => void;
  setProductNameZH?: (value: string) => void;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: (value: string) => void;
  ingredientInfo?: string;
  setWeight?: (value: number) => void;
  weight?: number;
  setManufacturedFor?: (value: string) => void;
  manufacturedFor?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
  editMode?: string;
  setEditMode?: (value: iEditedMode) => void;
  productNameENStyle?: iTextStyle;
  productNameZHStyle?: iTextStyle;
  defaultLabelStyle?:ILabelStyle
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: labelStyle } = useSWR(
    prop.labelInfo?.id
      ? `/api/prisma/getLabelStyle?id=${prop.labelInfo.id}`
      : null,
    fetcher
  );

  if (!labelStyle) {
    return (
      <Container>
        <CircularProgress />
        <p>Checking authentication...</p>
      </Container>
    );
  }

  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <RamenDiningIcon fontSize="large" />
        <div style={{ height: "auto", width: "50%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            onEditMode={() => prop.setEditMode&&prop.setEditMode(iEditedMode.productNameEn)}
            name="product_name_en"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px",
              background: "transparent",
              fontSize: prop.productNameENStyle?prop.productNameENStyle.fontSize :prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_en.fontSize,
              fontFamily: prop.productNameENStyle?prop.productNameENStyle.fontFamily:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_en.fontFamily
              ,
              color: prop.productNameENStyle&&prop.productNameENStyle.color,
              fontStyle: prop.productNameENStyle?prop.productNameENStyle.fontStyle:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_en.fontStyle,
              fontWeight: prop.productNameENStyle?prop.productNameENStyle.fontWeight:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_en.fontWeight,
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Allows text to wrap to the next line
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.2", // Adjust for consistent spacing
            }}
            value={prop.productNameEN}
            onChange={(e) => {
              prop.setProductNameEN && prop.setProductNameEN(e.target.value);
            }}
          />
        </div>
        <div style={{ height: "auto", width: "30%" }}>
          <EditText
            readonly={!prop.isEditedMode}
            onEditMode={() => prop.setEditMode&&prop.setEditMode(iEditedMode.productNameZh)}
            name="product_name_zh"
            style={{
              padding: "0px",
              background: "transparent",
              fontSize:prop.productNameZHStyle?prop.productNameZHStyle.fontSize:prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_zh.fontSize,
              fontFamily: prop.productNameZHStyle?prop.productNameZHStyle.fontFamily:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_zh.fontFamily,
              color: prop.productNameZHStyle&&prop.productNameZHStyle.color,
              fontStyle: prop.productNameZHStyle?prop.productNameZHStyle.fontStyle:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_zh.fontStyle,
              fontWeight: prop.productNameZHStyle?prop.productNameZHStyle.fontWeight:
              prop.defaultLabelStyle&&prop.defaultLabelStyle.product_name_zh.fontWeight,
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
        <div style={{ width: "100%", overflow: "hidden", height: 88 }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            style={{
              padding: "0px",
              margin: "0px",
              fontSize: prop.defaultLabelStyle&&prop.defaultLabelStyle.ingredient_info.fontSize,
              fontFamily: prop.defaultLabelStyle&&prop.defaultLabelStyle.ingredient_info.fontFamily,
              color: prop.defaultLabelStyle&&prop.defaultLabelStyle.ingredient_info.color,
              fontStyle: prop.defaultLabelStyle&&prop.defaultLabelStyle.ingredient_info.fontStyle,
              fontWeight: prop.defaultLabelStyle&&prop.defaultLabelStyle.ingredient_info.fontWeight,
              background: "transparent",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-line", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.5", // Adjust for consistent spacing
            }}
            
            rows={4}
            placeholder="I am an editable textarea"
            value={prop.ingredientInfo}
            onChange={(e) => {
              prop.setIngredientInfo && prop.setIngredientInfo(e.target.value);
            }}
            onEditMode={() => console.log("edit mode")}
          />
        </div>
      </Ingredients>
      <InfomationWrapper>
        <InfomationColumn flex={1.75}>
          <Typography variant="body2">
            Contains :&quot;&quot;&quot;&quot;
          </Typography>
          <Row>
            <Typography variant="body2" noWrap>
              Net Weight :
            </Typography>
            <EditText
              name="weight"
              type="number"
              style={{
                display: "block",
                fontSize: prop.defaultLabelStyle&&prop.defaultLabelStyle.weight.fontSize,
                fontFamily: prop.defaultLabelStyle&&prop.defaultLabelStyle.weight.fontFamily,
                color: prop.defaultLabelStyle&&prop.defaultLabelStyle.weight.color,
                fontStyle: prop.defaultLabelStyle&&prop.defaultLabelStyle.weight.fontStyle,
                fontWeight: prop.defaultLabelStyle&&prop.defaultLabelStyle.weight.fontWeight,
                background: "#ffffff",
                width: 50,
                minHeight: 24,
              }}
              value={prop.weight ? prop.weight.toString() : "0"}
              onChange={(e) =>
                prop.setWeight && prop.setWeight(Number(e.target.value))
              }
            />
            {/* <Typography>{prop.labelInfo.weight_unit}</Typography> */}
            <DropdownMenu
              type="weight"
              weightUnit={prop.weightUnit}
              setWeightUnit={prop.setWeightUnit}
            />
          </Row>
          <Typography variant="body2">
            {prop.labelInfo.storage_requirements}
          </Typography>
          <Typography variant="body2">Manufactured For:</Typography>
          <EditTextarea
            style={{
              width: "100%",
              fontSize: prop.defaultLabelStyle&&prop.defaultLabelStyle.manufactured_for.fontSize,
              fontFamily: prop.defaultLabelStyle&&prop.defaultLabelStyle.manufactured_for.fontFamily,
              color: prop.defaultLabelStyle&&prop.defaultLabelStyle.manufactured_for.color,
              fontStyle: prop.defaultLabelStyle&&prop.defaultLabelStyle.manufactured_for.fontStyle,
              fontWeight: prop.defaultLabelStyle&&prop.defaultLabelStyle.manufactured_for.fontWeight,
              height: 40,
              padding: "0px",
              margin: "0px",
              overflow: "hidden", // Hide scrollbar for a clean look
              background: "transparent",
            }}
            rows={2}
            value={prop.manufacturedFor}
            onChange={(e) =>
              prop.setManufacturedFor && prop.setManufacturedFor(e.target.value)
            }
          />
        </InfomationColumn>
        <InfomationColumn flex={1}>
          <Typography variant="body2">
            LOT #{prop.labelInfo.item_code}
          </Typography>
          <Typography variant="body2">BEST BY : 00000222</Typography>
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
