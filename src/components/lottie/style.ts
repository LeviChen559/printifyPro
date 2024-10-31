import styled from "@emotion/styled";

interface Props {
  top?: number;
  left?: number;
  right?: number;
  animationDelay?: string;
  display?: string;
  opacity?: number;
    type?: string;
}

export const LottieAnimationWrapper = styled.div<Props>(
  {
    opacity: 1,
    // background: "#ffffff",
    borderRadius: undefined,
    position: "absolute",
    animationDuration: "2s",
    width:350,
    height:350,
    animationDelay: "0s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  (props) => ({
    top: props.top,
    left: props.left,
    right: props.right,
    animationDelay: props.animationDelay,
    display: props.display,
    opacity: props.opacity,
    type: props.type,
  })
);
