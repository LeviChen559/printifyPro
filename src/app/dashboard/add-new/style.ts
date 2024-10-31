import styled from "@emotion/styled";

export const PreviewContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  overflow: "auto",
  width: "100%",
  flex: 1,
  position: "relative",
  padding:24,
  boxSizing: "border-box",
});

export const EditContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  overflow: "auto",
  width: "100%",
  flex: 1,
  background:"#bcbcbc",
  padding: 16,
  boxSizing: "border-box",

});

export const Column = styled.div({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 16,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    flex: .75,
})