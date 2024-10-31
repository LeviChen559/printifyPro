import React, { FC, useState ,useRef} from "react";
import { Container, View, Print, Options } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/components/labelTable";
import LabelCard from "@/components/labelCard";
import Button from "@/components/button";
import FormPropsTextFields from "@/components/FormPropsTextFields";


interface iProps {
  selectLabelInfo: iLabelInfo ;
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
  const [productNameZH, setProductNameZH] = useState<string>(
    prop.selectLabelInfo?.product_name_zh
  );
  const [productNameEN, setProductNameEN] = useState<string>(
    prop.selectLabelInfo?.product_name_en
  );

  console.log(prop.selectLabelInfo);

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
          labelInfo={prop.selectLabelInfo}
          showProductNameEN={true}
          showProductNameZH={true}
          productNameZH={productNameZH}
          productNameEN={productNameEN}
          isEditedMode={true}
        />
      </View>
      <Print>
        <Options>
          <FormPropsTextFields
            id="product_name_en"
            label="Product Name (English)"
            value={productNameEN}
            required={true}
            type="text"
            placeholder="Product Name (English)"
            onChange={(e) => setProductNameEN(e.target.value)}
            startIcon={null}
            sx={{ width: "20%", padding: "8px 0" }}
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
            sx={{ width: "20%", padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="weight"
            label="Net Weight"
            value={prop.selectLabelInfo.weight.toString()}
            required={true}
            type="number"
            placeholder="Net Weight"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="weight_unit"
            label="Net Weight Unit"
            value={prop.selectLabelInfo.weight_unit}
            required={true}
            type="text"
            placeholder="Net Weight Unit"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="case_quantity"
            label="Case Quantity"
            value={prop.selectLabelInfo.case_quantity.toString()}
            required={true}
            type="number"
            placeholder="Case Quantity"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="case_unit"
            label="Case Unit"
            value={prop.selectLabelInfo.case_unit}
            required={true}
            type="text"
            placeholder="Case Unit"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="storage_requirements"
            label="Storage Requirements"
            value={prop.selectLabelInfo.storage_requirements}
            required={true}
            type="text"
            placeholder="Storage Requirements"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />

          <FormPropsTextFields
            id="shelf_life"
            label="Shelf Life"
            value={prop.selectLabelInfo.shelf_life}
            required={true}
            type="text"
            placeholder="Shelf Life"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 125, padding: "8px 0" }}
          />
          <FormPropsTextFields
            id="case_gtin"
            label="Case GTIN"
            value={prop.selectLabelInfo.case_gtin}
            required={true}
            type="text"
            placeholder="Case GTIN"
            onChange={(e) => console.log(e.target.value)}
            startIcon={null}
            sx={{ width: 200, padding: "8px 0" }}
          />
        </Options>

        <Button
          btnText="Update the Label"
          onClick={() => {}}
          type="button"
        />
      </Print>
    </Container>
  );
};

export default LabelActionCard;
