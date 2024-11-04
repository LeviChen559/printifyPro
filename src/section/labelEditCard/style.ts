import styled from "@emotion/styled";

export const Container = styled.div({
width:"90%",
height:"90%",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
// padding:24,
borderRadius:16,
backgroundColor:"#ffffff",
boxShadow:"0px 4px 4px 0px #bcbcbc",
position:"absolute",
transform:"translateY(-50%)",
top:"50%",
overflow:"hidden",
})

export const View = styled.div({
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:16,
    flex:1.5,
    position:"relative",
    padding:24,
    overflowY:"auto",
    overflowX:"hidden",
    width:"100%",
    height:"100%",
})

export const Print = styled.div({
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
    gap:16,
    flex:1,
    background:"#bcbcbc80",
    width:"100%",
    height:"100%",
    padding:16,
})

export const Options = styled.div({
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    flexWrap:"wrap",
    alignItems:"flex-start",
    gap:8,
    flex:.8,
    padding:"8px 0 0 0",
    boxSizing:"border-box",
   
})
export const Column = styled.div({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 0,
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    flex: .75,
})
export const Row = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 200,
    padding: 0,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
})