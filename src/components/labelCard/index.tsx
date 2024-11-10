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
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <RamenDiningIcon fontSize="large" />
        <div style={{ height: "auto", width: "50%" }}>
          <EditTextarea
            readonly={!prop.isEditedMode}
            name="product_name_en"
            style={{
              padding: "0px",
              fontSize: 24,
              background: "transparent",
              fontFamily: "Arial",
              color: "#000000",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "normal", // Allows text to wrap to the next line
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
            name="product_name_zh"
            style={{
              padding: "0px",
              fontSize: 24,
              background: "transparent",
              color: "#000000",
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
              fontSize: 14,
              background: "transparent",
              fontFamily: "Arial",
              color: "#000000",
              overflow: "hidden", // Hide scrollbar for a clean look
              whiteSpace: "pre-wrap", // Ensures text wraps correctly
              overflowWrap: "break-word", // Breaks long words if necessary
              resize: "none", // Prevents resizing to maintain consistent font size view
              lineHeight: "1.5", // Adjust for consistent spacing
            }}
            rows={3}
            placeholder="I am an editable textarea"
            value={prop.ingredientInfo}
            onChange={(e) =>
              prop.setIngredientInfo && prop.setIngredientInfo(e.target.value)
            }
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
              inline
              style={{
                fontSize: 12,
                background: "#ffffff",
                color: "#000000",
                width: 75,
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
              fontSize: 14,
              height: 40,
              padding: "0px",
              margin: "0px",
              fontFamily: "Arial",
              color: "#000000",
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
            value={prop.labelInfo.case_gtin ?? "12345678901234"}
            width={2}
            height={50}
            fontSize={14}
            format="CODE128"
          />
        </InfomationColumn>
      </InfomationWrapper>
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
