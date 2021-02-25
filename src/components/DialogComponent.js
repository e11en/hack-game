import React from "react";
import styled from "styled-components";

const Dialog = styled.div`
    position: absolute;
    top: 150px;
    left: 200px;
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

export default ({show = false, onCommand = () => {}, onClose = () => {}, hasInput = true, showCloseButton = true, ...props}) => {
    const dialogClose = () => {
        onClose();
    };

    return (
        <React.Fragment>
            {
                show &&
                <Dialog {...props}>
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
