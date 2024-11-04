import React, {FC} from "react";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
const Lottie = dynamic(() => import("lottie-light-react"), {ssr: false});

import {LottieAnimationWrapper} from "./style";

interface Props {
    animationUrl: object;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    right?: number;
    animationDelay?: string;
    display?: string;
    opacity?: number;
    type?: string;
    text:string
}

const LottieAnimation: FC<Props> = (props) => {
    return (
        <LottieAnimationWrapper
        type={props.type}
            top={props.top}
            left={props.left}
            right={props.right}
            animationDelay={props.animationDelay}
            style={{height: props.height, width: props.width}}
            display={props.display}
            opacity={props.opacity}>
            <Lottie animationData={props.animationUrl} className="player" loop autoplay  style={{width:"100%",height:"100%"}}/>
            <Typography variant="h4" sx={{color:"#000000"}}>{props.text}</Typography>
        </LottieAnimationWrapper>
    );
};

export default LottieAnimation;