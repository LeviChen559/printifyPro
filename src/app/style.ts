import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const showUp = keyframes`
  0% {
    opacity: 0;
  },
50% {
opacity: 0;},
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f5f5f5",
  fontFamily: "Arial, sans-serif",
  color: "#333",
});

export const HomePageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f5f5f5",
  fontFamily: "Arial, sans-serif",
  color: "#333",
  gap: 16,
});

export const LogoContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  width: "auto",
  padding: 16,
  gap: 16,
  animation: `${fadeIn} 1s ease-in-out`,
});

export const ButtonContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  animation: `${showUp} 1.5s ease-in`,
  animationFillMode: "forwards",
});
