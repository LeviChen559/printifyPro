import React, { FC, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Container, View, Print, Options } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { iLabelInfo } from "@/components/labelTable";
import LabelCard from "@/components/labelCard";
import Button from "@/components/button";
import { TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { iTextStyle } from "@/section/labelEditCard/page";
import useSWR from "swr";

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
}

const LabelActionCard: FC<iProps> = (prop) => {
  const [showProductNameZH, setshowProductNameZH] = useState<boolean>(true);
  const [showProductNameEN, setshowProductNameEN] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: labelStyle } = useSWR(
    `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`,
    fetcher
  );
  console.log("labelStyle",labelStyle);

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
            isLabelUpdated: false,
          }))
        }
      />
      <View>
        <LabelCard
          labelInfo={prop.selectLabelInfo}
          showProductNameZH={showProductNameZH}
          showProductNameEN={showProductNameEN}
          ref={contentRef}
          isEditedMode={false}
          productNameEN={prop.selectLabelInfo.product_name_en}
          productNameZH={prop.selectLabelInfo.product_name_zh}
          ingredientInfo={prop.selectLabelInfo.ingredient_info}
          weight={prop.selectLabelInfo.weight}
          manufacturedFor={prop.selectLabelInfo.manufactured_for}
          weightUnit={prop.selectLabelInfo.weight_unit}
          productNameENStyle={labelStyle.data[0].product_name_en as iTextStyle}
          productNameZHStyle={labelStyle.data[0].product_name_zh as iTextStyle}
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

export default LabelActionCard;
