"use client";
import { HomePageContainer, LogoContainer,ButtonContainer } from "./style";
import { Typography } from "@mui/material";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { kanit } from "@/theme";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";



export default function Home() {
  const router = useRouter();
  return (
    <HomePageContainer>
      <LogoContainer>
        <LocalPrintshopIcon fontSize="large" />
        <Typography variant="h2" fontFamily={kanit.style.fontFamily}>
          Printify Pro
        </Typography>
      </LogoContainer>
      <ButtonContainer>
      <Button
        btnText="Sign In to the Pritify Pro"
        backgroundColor="#bcbcbc"
        onClick={() => router.push("/signin")}
      />
      </ButtonContainer>
    </HomePageContainer>
  );
}
