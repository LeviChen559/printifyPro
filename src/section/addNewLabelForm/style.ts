import styled from "@emotion/styled";
interface iProps {
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
    gap?: number;
    background?: string;
  }

export const Column = styled.div<iProps>({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    // padding: 16,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    marginTop:8,
  });