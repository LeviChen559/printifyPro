import React, { FC } from "react";
import { Container } from "./style";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";

interface iProps {
  setShowCard: React.Dispatch<
    React.SetStateAction<{
      labelActionCard: boolean;
      labelPrintCard: boolean;
      labelEditCard: boolean;
      isLabelUpdated: boolean;
    }>
  >;
  duplicatedLabel: string;
}
enum CardType {
  LabelEdit = "labelEditCard",
  LabelPrint = "labelPrintCard",
  LabelAction = "labelActionCard",
  empty = "emptyCard",
}

const LabelActionCard: FC<iProps> = (prop) => {
  const router = useRouter();
  const switchCard = (type: CardType) => {
    prop.setShowCard(() => ({
      labelActionCard: false,
      isLabelUpdated: false,
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
        onClick={() => {
          switchCard(CardType.empty);
        }}
      />
      <Button
        btnText="Edit this Label"
        onClick={() => switchCard(CardType.LabelEdit)}
        type="button"
        width={"200px"}
        startIcon={<EditNoteRoundedIcon color="secondary" />}
      />
      <Button
        btnText="Duplicate this Label"
        onClick={() =>
          router.push(
            `/dashboard/add-new?duplicatedLabel=${prop.duplicatedLabel}`
          )
        }
        type="button"
        width={"200px"}
        startIcon={<ContentCopyRoundedIcon color="secondary" />}
      />
      <Button
        btnText="Print this Label"
        onClick={() => switchCard(CardType.LabelPrint)}
        type="button"
        width={"200px"}
        startIcon={<LocalPrintshopRoundedIcon color="secondary" />}
      />
    </Container>
  );
};

export default LabelActionCard;
