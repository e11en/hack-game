import React from "react";
import styled from "styled-components";

import { getPixelSize } from "../helpers/constants";

const LevelElement = styled.div`
    transform: translate3d(${props => props.x * getPixelSize()}px, ${props => props.y * getPixelSize()}px, 0);
    width: calc(${props => props.width}px * var(--pixel-size));
    height: calc(${props => props.height}px * var(--pixel-size));
    overflow: hidden;
    position: absolute;
    outline: ${props => props.showOutline ? 3 : 0}px solid cyan;
    background-image: url("${props => props.imageSource}");
    background-size: cover;
    background-repeat: no-repeat;
    display: ${props => props.enabled ? "block" : "none"};
`;

export default (props) => {
    return (
        <LevelElement {...props}/>
    );
};