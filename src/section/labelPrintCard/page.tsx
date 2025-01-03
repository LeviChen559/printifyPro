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
import { iLabelStyle,iTextStyle } from "@/type/labelType";
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
}

const LabelPrintCard: FC<iProps> = (prop) => {
  const [showProductNameZH, setshowProductNameZH] = useState<boolean>(true);
  const [showProductNameEN, setshowProductNameEN] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { data: labelStyle } = useSWR(
    `/api/prisma/getLabelStyle?id=${prop.selectLabelInfo.id}`,
    fetcher
  );

  if (!labelStyle || !Array.isArray(labelStyle.data))
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
          type={prop.selectLabelInfo.label_size}
          logo={prop.selectLabelInfo.logo}
          productNameEN={prop.selectLabelInfo.product_name_en}
          productNameZH={prop.selectLabelInfo.product_name_zh}
          ingredientInfo={prop.selectLabelInfo.ingredient_info}
          caseUnit={prop.selectLabelInfo.case_unit}
          caseQuantity={prop.selectLabelInfo.case_quantity}
          weight={prop.selectLabelInfo.weight}
          manufacturedFor={prop.selectLabelInfo.manufactured_for}
          storageRequirements={prop.selectLabelInfo.storage_requirements}
          weightUnit={prop.selectLabelInfo.weight_unit}
          productNameENStyle={ labelStyle.data[0].product_name_en as iTextStyle}
          productNameZHStyle={labelStyle.data[0].product_name_zh as iTextStyle}
          defaultLabelStyle={labelStyle.data[0] as iLabelStyle}
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
