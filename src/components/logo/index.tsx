// import RamenDiningIcon from "@mui/icons-material/RamenDining";
// import EggAltIcon from "@mui/icons-material/EggAlt";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import AgricultureIcon from "@mui/icons-material/Agriculture";
import { FC } from "react";
import Image from "next/image";
import HonsLogo from "@/assets/honsLogo.webp";
import sunningfoods from "@/assets/sunningfoods.webp";
import shinsenna from "@/assets/shinsenna.webp";
import viethuong from "@/assets/viethuong.webp";
import { Container } from "./style";

import React from "react";
interface iProps {
  logo: string;
}

const LabelLogo: FC<iProps> = (prop) => {
  return (
    <Container>
      {prop.logo === "hons" ? (
        <Image
          src={HonsLogo}
          alt="Hons"
          width={60}
          height={30}
          style={{ objectFit: "cover" }}
        />
      ) : prop.logo === "sunningfoods" ? (
        <Image
          src={sunningfoods}
          alt="Sunning foods"
          width={60}
          height={55}
          style={{ objectFit: "cover" }}
        />
      ) : prop.logo === "shinsenna" ? (
        <Image
          src={shinsenna}
          alt="Shinsenna"
          width={45}
          height={55}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Image
          src={viethuong}
          alt="Viet Huong"
          width={60}
          height={25}
          style={{ objectFit: "cover" }}
        />
      )}
    </Container>
  );
};

export default LabelLogo;
