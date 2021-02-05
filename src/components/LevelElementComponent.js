import React from "react";
import styled from "styled-components";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));

const LevelElement = styled.div`
    transform: translate3d(${props => props.x * pixelSize}px, ${props => props.y * pixelSize}px, 0);
    width: calc(${props => props.width}px * var(--pixel-size));
    height: calc(${props => props.height}px * var(--pixel-size));
    overflow: hidden;
    position: absolute;
    outline: ${props => props.showOutline ? 3 : 0}px solid cyan;
    background-image: url("${props => props.imageSource}");
    background-size: cover;
    background-repeat: no-repeat;
`;

export default (props) => {
    return (
        <LevelElement {...props}/>
    );
};