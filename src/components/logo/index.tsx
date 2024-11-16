import RamenDiningIcon from "@mui/icons-material/RamenDining";
import EggAltIcon from "@mui/icons-material/EggAlt";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { FC } from "react";


import React from 'react'
interface iProps{
logo:string
fontSize:number
}

const LabelLogo:FC<iProps> = (prop) => {
  return (
    prop.logo === "001" ? (
        <RamenDiningIcon fontSize="large" sx={{ fontSize: prop.fontSize }} />
      ) : prop.logo === "002" ? (
        <EggAltIcon fontSize="large" sx={{ fontSize: prop.fontSize }} />
      ) : prop.logo === "003" ? (
        <AgricultureIcon fontSize="large" sx={{ fontSize: prop.fontSize }} />
      ) : (
        <AcUnitIcon fontSize="large" sx={{ fontSize: prop.fontSize }} />
      )
  )
}

export default LabelLogo