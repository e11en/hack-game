import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));

const Dialog = styled.div.attrs(props => ({
    style: {
        transform: `translate3d(${(props.x * pixelSize) - 200}px, ${(props.y * pixelSize) - 50}px, 0)`
    },
}))
`
    position: absolute;
    width: 400px;
    height: 200px;
    background-color: #35312b;
    border: 3px solid #585653;
    border-top: 25px solid #585653;
    color: #3b9e1c;
    z-index: 1;
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
`;

const Close = styled.div`
    position: absolute;
    top: -21px;
    right: 1px;
    background-color: #46423d;
    padding: 1px 5px;
    color: #bfbfbf;

    &:hover {
        color: #ffffff;
        background-color: #c31818;
        cursor: pointer;
    }
`;

export default (props) => {
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);

    return (
        <Dialog {...props} x={x} y={y}>
            <Close onClick={props.onClose}>x</Close>
            { props.children }            
        </Dialog>
    );
};
