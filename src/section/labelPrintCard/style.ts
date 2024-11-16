import styled from "@emotion/styled";

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
// gap:16,
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
    padding:"24px 24px 24px 24px",
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
    padding:"16px 16px 16px 0px",
})

export const Options = styled.div({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"flex-start",
    gap:8,
    flex:.8,
   
})