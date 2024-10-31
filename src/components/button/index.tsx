import React, { FC } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface iProps {
  btnText: string;
  endIcon?: React.ReactNode;
  width?: string;
  onClick?: () => void;
  formAction?: () => void;
  type?: "submit" | "reset" | "button" ;
}

const index: FC<iProps> = (props) => {
  return (
    <Button
      variant="contained"
      endIcon={props.endIcon}
      sx={{ width: props.width, padding: 2, borderRadius: 2 }}
      formAction={props.formAction}
      onClick={props.onClick}
      type={props.type}
    >
      <Typography color="textSecondary" sx={{ textTransform: "capitalize" }}>
        {props.btnText}
      </Typography>
    </Button>
  );
};

export default index;
