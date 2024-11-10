import styled from "@emotion/styled";

interface iProps {
    flex?:number
}

export const  Container =styled.div({
    width:576,
    height:384,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    padding:24,
    borderRadius:16,
    backgroundColor:"#ffffff",
    boxShadow:"0px 4px 4px 0px #bcbcbc",
    gap:8,
    position:"absolute",
    transform:"translateY(-50%)",
    top:"50%",
})

export const Header = styled.div({
    width:"100%",
    height:"auto",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:16,
    borderBottom:"1px solid #bcbcbc"
})

export const InfomationWrapper = styled.div({    
    display:"flex",
    flexDirection:"row",
    width:"100%",
    height:"auto",
    justifyContent:"space-between",
    alignItems:"flex-start",
    gap:16
})
export const InfomationColumn = styled.div<iProps>({
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:4,
    width:"100%",
    position:"relative" 
},props=>({
    flex: props.flex
}))

export const Ingredients = styled.div({
    width:"100%",
    height:"auto",
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:4
})

export const Row = styled.div({
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:4,
    height:24,
})