import React, { forwardRef } from "react";
import {
  Container,
  Header,
  InfomationWrapper,
  InfomationColumn,
  Ingredients,
} from "./style";
import { iLabelInfo } from "../labelTable";
import { Typography } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Barcode from "react-barcode";

interface iProp {
  labelInfo: iLabelInfo ;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> | undefined;
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
  return (
    <Container id="labelCard" ref={ref}>
      <Header>
        <RamenDiningIcon fontSize="large" />
        {prop.isEditedMode ? (
          <Typography variant="h3">{prop.labelInfo.product_name_en}</Typography>
        ) : (
          prop.showProductNameEN && (
            <Typography variant="h3">
              {prop.labelInfo.product_name_en}
            </Typography>
          )
        )}
        {prop.isEditedMode ? (
          <Typography variant="h3">{prop.labelInfo.product_name_zh}</Typography>
        ) : (
          prop.showProductNameZH && (
            <Typography variant="h5" whiteSpace={"nowrap"}>
              {prop.labelInfo.product_name_zh}
            </Typography>
          )
        )}
      </Header>
      <Ingredients>
        <Typography width={"100%"}>Ingredients:</Typography>
        <Typography width={"100%"}>
          {
          prop.labelInfo.ingredient_info ??
          `Rice Flour: 2 cups (about 250g), Tapioca Starch: 1/2 cup (about 60g)
          (optional, for chewiness),Water: 2 to 2.5 cups (adjust as needed),
          Salt: 1/2 teaspoon, Oil: 1 tablespoon (for greasing)`}
        </Typography>
      </Ingredients>

      <InfomationWrapper>
        <InfomationColumn flex={1.75}>
          <Typography variant="body2">Contains :&quot;&quot;&quot;&quot;</Typography>
          <Typography variant="body2">
            Net Weight : {prop.labelInfo.weight+ " "}  
            {prop.labelInfo.weight_unit}
          </Typography>
          <Typography variant="body2">
            {prop.labelInfo.storage_requirements}
          </Typography>
          <Typography variant="body2">Manufactured For:</Typography>
          <Typography variant="body2">
            1234 Maple Street Vancouver, BC V5K 1A1 Canada
          </Typography>
        </InfomationColumn>
        <InfomationColumn flex={1}>
          <Typography variant="body2">
            LOT #{prop.labelInfo.item_code}
          </Typography>
          <Typography variant="body2">BEST BY : 00000222</Typography>
          <Barcode
            value={prop.labelInfo.case_gtin ??"code-128"}
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
