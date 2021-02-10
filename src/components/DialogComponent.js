import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import { DialogTexts } from "data/translations";
import { getPixelSize } from "../helpers/constants";
import { getCharacterX, getCharacterY, getGameLanguage } from "../state/selectors";

const Dialog = styled.div.attrs(props => ({
    style: {
        transform: `translate3d(${(props.x * getPixelSize()) - 200}px, ${(props.y * getPixelSize()) - 100}px, 0)`
    },
}))
`
    position: absolute;
    width: 400px;
    height: 240px;
    background-color: #35312b;
    border: 3px solid #585653;
    border-top: 32px solid #585653;
    color: #3b9e1c;
    z-index: 1;
    display: ${props => props.show ? "flex" : "none"};
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

const Text = styled.p`
    margin: 5px;
    overflow-x: auto;
    flex: 1;

    & td {
        min-width: 3em;
    }
`;

const InputWrapper = styled.div`
    margin: 0 5px 5px;

    & > span {
        margin-right: 10px;
    }
`;

const Input = styled.input`
    width: 350px;
    border: none;
    background-color: #35312b;
    color: #3b9e1c;

    &:focus {
        outline: none;
    }
`;

export default forwardRef(({show = false, onCommand = () => {}, onClose = () => {}, hasInput = true, ...props}, ref) => {
    const language = useSelector(getGameLanguage);
    const x = useSelector(getCharacterX);
    const y = useSelector(getCharacterY);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (show) {
            alwaysFocus();
            scrollDown();    
        }
    }, [show]);

    useImperativeHandle(ref, () => ({
        setText(text) {
            addToText(text);
        }
    }));

    const processCommand = () => {
        if (inputValue === "exit") {
            dialogClose();
            return;
        }

        if (onCommand(inputValue)) return;

        addToText(DialogTexts.commandNotFoundText(inputValue)[language]);
    };

    const onKeyUp = (e) => {
        if (e.key === "Enter") {
            addToText("> " + inputValue);
            processCommand();
            setInputValue("");
        }
    };

    const dialogClose = () => {
        textRef.current.innerHTML = "";
        onClose();
    };

    const addToText = (text) => {
        if (textRef && textRef.current)
            textRef.current.innerHTML += text + "<br/>";

        scrollDown();
    };

    const scrollDown = () => {
        if (textRef && textRef.current)
        textRef.current.scrollTop = textRef.current.scrollHeight;
    };

    const alwaysFocus = () => {
        if (inputRef && inputRef.current)
            inputRef.current.focus();
    };

    const onChange = (e) => {
        setInputValue(e.target.value);
    };
    
    return (
        <Dialog show={show} x={x} y={y}>
            <Close onClick={dialogClose}>x</Close>
            <Text ref={textRef}></Text>
            {
                hasInput &&
                <InputWrapper>
                    <span>{">"}</span>
                    <Input autoFocus={true}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        onBlur={alwaysFocus}
                        value={inputValue}
                        ref={inputRef}/>
                </InputWrapper>  
            }
            {props.children}
        </Dialog>
    );
});
