import React, { FC } from "react";
import { Container } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Button from "@/components/button";


interface iProps {
  setShowCard: React.Dispatch<
    React.SetStateAction<{
      labelActionCard: boolean;
      labelPrintCard: boolean;
      labelEditCard: boolean;
      isLabelUpdated: boolean;
    }>
  >;
}
enum CardType {
  LabelEdit = "labelEditCard",
  LabelPrint = "labelPrintCard",
  LabelAction = "labelActionCard",
  empty = "emptyCard",
}

const LabelActionCard: FC<iProps> = (prop) => {

  const switchCard = (type: CardType) => {
    console.log("open:" + type);
    prop.setShowCard(() => ({
      labelActionCard: false,
      isLabelUpdated:false,
      labelEditCard: type === CardType.LabelEdit,
      labelPrintCard: type === CardType.LabelPrint,
    }));

  };
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
        onClick={() =>{
        switchCard(CardType.empty)}}
      />
      <Button
        btnText="Edit this Label"
          onClick={() => switchCard(CardType.LabelEdit)}
        type="button"
      />
      <Button
        btnText="Print this Label"
        onClick={() => switchCard(CardType.LabelPrint)}
        type="button"
      />
    </Container>
  );
};

export default LabelActionCard;
