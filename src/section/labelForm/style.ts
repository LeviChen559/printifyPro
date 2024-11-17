import styled from "@emotion/styled";
interface iProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  gap?: number;
  background?: string;
  height?: string;
  position?: "fixed" | "absolute" | "relative";
  overflowY?: "auto" | "hidden";
}

export const Column = styled.div<iProps>(
  {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  (props) => ({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.padding,
    gap: props.gap,
    background: props.background,
    height: props.height,
    position: props.position,
    overflowY: props.overflowY,
  })
);

export const Form = styled.form<iProps>(
  {
    height: "100%",
    gap: 16,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  }
);
