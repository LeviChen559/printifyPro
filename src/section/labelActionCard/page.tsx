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

  const features =[
    {
      text: "Edit this Label",
      icon: <EditNoteRoundedIcon color="secondary" />,
      action: () => switchCard(CardType.LabelEdit),
    },
    {
      text: "Duplicate this Label",
      icon: <ContentCopyRoundedIcon color="secondary" />,
      action: () =>
        router.push(`/dashboard/add-new?duplicatedLabel=${prop.duplicatedLabel}`),
    },
    {
      text: "Print this Label",
      icon: <LocalPrintshopRoundedIcon color="secondary" />,
      action: () => switchCard(CardType.LabelPrint),
    },
  ] 

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
      {
        features.map((feature, index) => (
          <Button
            key={index}
            btnText={feature.text}
            onClick={feature.action}
            type="button"
            width={"100%"}
            startIcon={feature.icon}
            gap={2}
            justifyContent="flex-start"
          />
        ))
      }
    </Container>
  );
};

export default LabelActionCard;
