import React, { FC, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Container, View, Print, Options } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/type/labelType";
import LabelCard from "@/section/labelCards";
import Button from "@/components/button";
import { CircularProgress, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { iTextStyle,iEditedMode } from "@/type/labelType";
import useSWR from "swr";
import { fetcher } from "@/utils/lib/fetcher";


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
  defaultText: iTextStyle;
}

const LabelPrintCard: FC<iProps> = (prop) => {
  const [showProductNameZH, setshowProductNameZH] = useState<boolean>(true);
  const [showProductNameEN, setshowProductNameEN] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { data: labelStyle ,error} = useSWR(
    `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`,
    fetcher
  );
  const parseIfNeeded = (data: string) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("JSON parsing failed:", data);
        return data; // Return original data if parsing fails
      }
    }
    return data; // Already an object, return as is
  };
  
  const productNameENStyle = parseIfNeeded(labelStyle?.data[0]?.product_name_en);
  const productNameZHStyle = parseIfNeeded(labelStyle?.data[0]?.product_name_zh);
  const ingredientStyle = parseIfNeeded(labelStyle?.data[0]?.ingredient);
  const manufacturedStyle = parseIfNeeded(labelStyle?.data[0]?.manufactured);
  const allergenStyle = parseIfNeeded(labelStyle?.data[0]?.allergen);
  const defaultLabelStyle = labelStyle?.data[0]; // No need to parse the full object
  if (error) return <div>Error loading label style.</div>;
  if (!labelStyle || !Array.isArray(labelStyle.data)|| !labelStyle.data.length)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

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
            labelDuplicateCard: false,
            isLabelUpdated: false,
          }))
        }
      />
      <View>
        <LabelCard
          labelInput={prop.selectLabelInfo}
          showProductNameZH={showProductNameZH}
          showProductNameEN={showProductNameEN}
          ref={contentRef}
          isEditedMode={false}
          type={prop.selectLabelInfo.label_temp}
          logo={prop.selectLabelInfo.logo}
          productNameEN={prop.selectLabelInfo.product_name_en}
          productNameZH={prop.selectLabelInfo.product_name_zh}
          ingredient={prop.selectLabelInfo.ingredient}
          caseUnit={prop.selectLabelInfo.case_unit}
          caseQuantity={prop.selectLabelInfo.case_quantity}
          weight={prop.selectLabelInfo.weight}
          manufactured={prop.selectLabelInfo.manufactured}
          allergen={prop.selectLabelInfo.allergen}
          storage={prop.selectLabelInfo.storage}
          itemCode={prop.selectLabelInfo.item_code}
          productNameENStyle={ productNameENStyle }
          productNameZHStyle={ productNameZHStyle }
          ingredientStyle={ ingredientStyle }
          allergenStyle={ allergenStyle }
          manufacturedStyle={ manufacturedStyle }
          defaultLabelStyle= { defaultLabelStyle }
          showBorder={false}
          defaultText={prop.defaultText}
          editMode={iEditedMode.empty}
        />
      </View>
      <Print>
        <Options>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Print All Info"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            onChange={() => setshowProductNameEN(!showProductNameEN)}
            control={<Checkbox defaultChecked />}
            label="Product Name (English)"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            onChange={() => setshowProductNameZH(!showProductNameZH)}
            control={<Checkbox defaultChecked />}
            label="Product Name (Chinese)"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Ingredients"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Contains:"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Net Weight:"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Storage Requirements"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Manufactured For:"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="LOT #:"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="BEST BY:"
            sx={{ height: 18 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Barcode:"
            sx={{ height: 18 }}
          />
        </Options>
        <TextField
          id="standard-number"
          label="Print Label Number"
          type="number"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button
          btnText="Print This Label"
          onClick={reactToPrintFn}
          type="button"
        />
      </Print>
    </Container>
  );
};

export default LabelPrintCard;
