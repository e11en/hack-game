import React from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
const camera_left = pixelSize * 110;
const camera_top = pixelSize * 70;

const Map = styled.div.attrs(props => ({
        style: {
            transform: `translate3d(${-props.x * pixelSize + camera_left}px, ${-props.y * pixelSize + camera_top}px, 0)`
        },
    }))
`
    image-rendering: pixelated;
    background-image: url("${process.env.PUBLIC_URL}/resources/maps/empty.png");
    background-size: 100%;
    width: calc(10px * var(--grid-cell));
    height: calc(10px * var(--grid-cell));
    position: relative;
    background-repeat: no-repeat;
`;

export default (props) => {
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);

    return (
        <Map x={x} y={y}>
            {props.children}
        </Map>
    );
};
