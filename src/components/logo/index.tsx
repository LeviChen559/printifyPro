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
  size?: "sm" | "md" | "lg";
}

const LabelLogo: FC<iProps> = (prop) => {
  const logos = {
    hons: {
      src: HonsLogo,
      alt: "Hons",
      width:
        prop.size === "sm" ? 260 / 8 : prop.size === "md" ? 260 / 5 : 260 / 3.5,
      height:
        prop.size === "sm" ? 130 / 8 : prop.size === "md" ? 130 / 5 : 130 / 3.5,
    },
    sunningfoods: {
      src: sunningfoods,
      alt: "Sunning foods",
      width:
        prop.size === "sm" ? 335 / 10 : prop.size === "md" ? 335 / 5 : 335 / 4,
      height:
        prop.size === "sm" ? 295 / 10 : prop.size === "md" ? 295 / 5 : 295 / 4,
    },
    shinsenna: {
      src: shinsenna,
      alt: "Shinsenna",
      width:
        prop.size === "sm" ? 238 / 8 : prop.size === "md" ? 238 / 5 : 238 / 3,
      height:
        prop.size === "sm" ? 296 / 8 : prop.size === "md" ? 296 / 5 : 296 / 3,
    },
    viethuong: {
      src: viethuong,
      alt: "Viet Huong",
      width:
        prop.size === "sm" ? 415 / 10 : prop.size === "md" ? 415 / 5 : 415 / 4,
      height:
        prop.size === "sm" ? 158 / 10 : prop.size === "md" ? 158 / 5 : 158 / 4,
    },
  };

  const logoKey = (
    prop.logo in logos ? prop.logo : "viethuong"
  ) as keyof typeof logos;
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
