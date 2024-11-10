import styled from "@emotion/styled";

interface iProps{
    justifyContent?:string
}

export const Container = styled.div({
width:"95%",
height:"90%",
display:"flex",
flexDirection:"row",
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
    flex:2.5,
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

export const Info = styled.div({
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:8,
    flex:.8,
    padding:"50px 0 0 0",
    boxSizing:"border-box",
    width:"100%"
   
})
export const Column = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems:"flex-start",
    gap: 8,
    padding: 0,
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    flex: .75,
})
export const Row = styled.div<iProps>({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    padding: 0,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
},props=>({
    justifyContent:props.justifyContent
}))