import React, { FC } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface iProps {
  btnText: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  width?: string;
  onClick?: () => void;
  formAction?: () => void;
  type?: "submit" | "reset" | "button";
  backgroundColor?: string;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
    gap?: number;
}

const index: FC<iProps> = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      sx={{
        width: props.width,
        padding: 2,
        borderRadius: 2,
        backgroundColor: props.backgroundColor,
        textWrap: "nowrap",
        display: "flex",
        flexDirection: "row",
        justifyContent: props.justifyContent,
        gap:props.gap? props.gap : 4,
      }}
      formAction={props.formAction}
      onClick={props.onClick}
      type={props.type}
    >
      <Typography
        color="textThirdary"
        sx={{ textTransform: "capitalize", fontWeight: 700 }}
      >
        {props.btnText}
      </Typography>
    </Button>
  );
};

export default index;
