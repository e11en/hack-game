import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import { getCharacterX, getCharacterY } from "../state/selectors";
import { getPixelSize } from "../helpers/constants";

const Dialog = styled.div.attrs(props => ({
    style: props.placeOverCharacter ? {
        transform: `translate3d(${(props.x * getPixelSize()) - 300}px, ${(props.y * getPixelSize()) - 200}px, 0)`
    } : {},
}))
`
    position: fixed;
    top: calc(50% - 310px);
    left: calc(50% - 350px);
    width: 400px;
    height: 240px;
    background-color: #35312b;
    border: 3px solid #585653;
    border-top: 32px solid #585653;
    color: #3b9e1c;
    z-index: 1;
    display: flex;
    flex-direction: column;
`;

const Close = styled.div`
    position: absolute;
    top: -29px;
    right: 1px;
    background-color: #46423d;
    padding: 0px 8px 2px;
    color: #bfbfbf;

    &:hover {
        color: #ffffff;
        background-color: #c31818;
        cursor: pointer;
    }
`;

export default ({show = false, onCommand = () => {}, onClose = () => {}, hasInput = true, showCloseButton = true, placeOverCharacter = false, ...props}) => {
    const x = useSelector(getCharacterX);
    const y = useSelector(getCharacterY);

    const dialogClose = () => {
        onClose();
    };

    return (
        <React.Fragment>
            {
                show &&
                <Dialog x={x} y={y} placeOverCharacter={placeOverCharacter} {...props}>
                    {
                        showCloseButton &&
                        <Close onClick={dialogClose}>x</Close>
                    }
                    {props.children}
                </Dialog>
            }
        </React.Fragment>
    );
};
