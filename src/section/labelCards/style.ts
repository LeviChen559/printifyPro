import styled from "@emotion/styled";

interface iProps {
  flex?: number;
  width?: string | number;
  justifyContent?: string;
  height?: string;
  alignItems?: string;
  gap?: number;
  zIndex?: number;
  background?: string;
  paddingTop?: number;
  flexDirection?: "row" | "column";
}

export const Container = styled.div<iProps>((props) => ({
  width: props.width ?? 360,
  height: props.height ?? 312,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 8,
  borderRadius: 4,
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 4px 0px #bcbcbc",
  border: "1px solid #bcbcbc80",
  gap: 4,
  position: "relative",
  overflow: "hidden",
  
}));

export const Header = styled.div({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 12,
  borderBottom: "1px solid #bcbcbc",
  paddingBottom:4
});

export const InfomationWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 4,
});
export const InfomationColumn = styled.div<iProps>(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  (props) => ({
    flex: props.flex,
    width: props.width,
    zIndex: props.zIndex,
  })
);

export const Ingredients = styled.div<iProps>((props) => ({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: props.flexDirection ?? "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: props.gap ?? 12,
}));

export const Row = styled.div<iProps>((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: props.justifyContent ?? "flex-start",
  alignItems: props.alignItems ?? "center",
  gap: props.gap ?? 4,
  height: props.height ?? 24,
  zIndex: props.zIndex,
  background: props.background,
  width: props.width ?? "100%", // Set default via prop fallback
}));

export const Col = styled.div<iProps>(
  {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
    height: "auto",
  },
  (props) => ({
    width: props.width,
    justifyContent: props.justifyContent,
    height: props.height,
    alignItems: props.alignItems,
    gap: props.gap,
    paddingTop: props.paddingTop,
  })
);
