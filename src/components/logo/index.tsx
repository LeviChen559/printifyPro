
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
  const logos = {
    hons: { src: HonsLogo, alt: "Hons", width: 260 / 3.5, height: 130 / 3.5 },
    sunningfoods: {
      src: sunningfoods,
      alt: "Sunning foods",
      width: 335/4,
      height: 295/4,
    },
    shinsenna: { src: shinsenna, alt: "Shinsenna", width: 238/3, height: 296/3 },
    viethuong: { src: viethuong, alt: "Viet Huong", width: 415/4, height: 158/4 },
  };

  const logoKey = (prop.logo in logos ? prop.logo : "viethuong") as keyof typeof logos;
  const { src, alt, width, height } = logos[logoKey];
  return (
    <Container>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
      />
    </Container>
  );
};

export default LabelLogo;
