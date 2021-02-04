import React from "react";
import styled from "styled-components";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));

const LevelElement = styled.div`
    transform: translate3d(${props => props.x * pixelSize}px, ${props => props.y * pixelSize}px, 0);
    width: calc(${props => props.width}px * var(--pixel-size));
    height: calc(${props => props.height}px * var(--pixel-size));
    overflow: hidden;
    position: absolute;
    outline: 2px solid cyan;
`;

const Image = styled.img`
    width: calc(${props => props.width}px * var(--pixel-size));
`;

export default ({imageSource, x = 0, y = 0, width = 32, height = 32}) => {
    return (
        <LevelElement x={x} y={y} width={width} height={height}>
            <Image src={process.env.PUBLIC_URL + imageSource} width={width}/>
        </LevelElement>
    );
};
