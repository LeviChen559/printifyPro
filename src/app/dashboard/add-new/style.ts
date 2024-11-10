import styled from "@emotion/styled";

interface iProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  gap?: number;
  background?: string;
}
export const Container = styled.div<iProps>(
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 24,
    gap: 16,
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    position: "relative",
  },
  (props) => ({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.padding,
    gap: props.gap,
    background: props.background,
  })
);

export const PreviewContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  overflow: "auto",
  width: "100%",
  height: "100%",
  flex: 3,
  position: "relative",
  padding: 24,
  boxSizing: "border-box",
});

export const EditContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  width: "100%",
  height: "100%",
  flex: 1,
  background: "#bcbcbc",
  padding: "16px 24px 16px 24px",
  boxSizing: "border-box",
  gap: 8,
});

export const Column = styled.div<iProps>({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  // padding: 16,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  marginTop:24
});
