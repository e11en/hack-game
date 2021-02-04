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
    color: #3b9e1c;
    z-index: 1;
    //display: ${props => props.show ? "flex" : "none"};
    display: flex;
    flex-direction: column;
`;

const Text = styled.p`
    margin: 1em;
`;

const InputWrapper = styled.div`
    padding: 1em;
    position: absolute;
    bottom: 0;

    & > span {
        margin-right: 10px;
    }
`;

const Input = styled.input`
    width: 339px;
    border: none;
    background-color: #35312b;
    color: #3b9e1c;

    &:focus {
        outline: none;
    }
`;

export default (props) => {
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);

    return (
        <Dialog {...props} x={x} y={y}>
            <Text>{ props.children }</Text>
            <InputWrapper>
                <span>{">"}</span>
                <Input autoFocus={true} autoCorrect="false" autoComplete="false"/>
            </InputWrapper>
        </Dialog>
    );
};
