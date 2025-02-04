// import RamenDiningIcon from "@mui/icons-material/RamenDining";
// import EggAltIcon from "@mui/icons-material/EggAlt";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import AgricultureIcon from "@mui/icons-material/Agriculture";
import { FC } from "react";
import Image from "next/image";
import HonsLogo from "@/assets/honsLogo.webp";
import  sunningfoods from "@/assets/sunningfoods.webp";
import   shinsenna from "@/assets/shinsenna.webp";
import viethuong from "@/assets/viethuong.webp";
import {Container} from "./style";

import React from "react";
interface iProps {
  logo: string;
}

const LabelLogo: FC<iProps> = (prop) => {
  return (
    <Container>
      {prop.logo === "001" ? (
        <Image src={HonsLogo} alt="Hons" fill  style={{objectFit:"contain"}} />
      ) : prop.logo === "002" ? (
        <Image src={sunningfoods} alt="Sunning foods" fill  style={{objectFit:"contain"}} />
      ) : prop.logo === "003" ? (
        <Image src={shinsenna} alt="Shinsenna" fill  style={{objectFit:"contain"}} />
      ) : (
        <Image src={viethuong} alt="Viet Huong" fill  style={{objectFit:"contain"}} />
      )}
    </Container>
  );
};

export default LabelLogo;
