import styled from "@emotion/styled";

interface iProps{
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
    gap?: number;
    background?: string;
}
export const Container =styled.div<iProps>({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
    padding:24,
    gap:16,
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    position: "relative",
},props=>({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    padding: props.padding,
    gap: props.gap,
    background:props.background
}))

export const WorkPannel =styled.div<iProps>({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 1000,
    width: 1440,
    backgroundColor: "#ffffff",
    gap:0,
    border: "1px solid #bcbcbc",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
    borderRadius: 16,
    position: "relative",
    boxShadow: "0px 4px 4px 0px #bcbcbc80",
},props=>({
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
}))

export const SearchContainer =styled.div({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",
    width: "100%",
    backgroundColor: "#ffffff",
    padding:0,
    gap:16,
    fontFamily: "Arial, sans-serif",
})