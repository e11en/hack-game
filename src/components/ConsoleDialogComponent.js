import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import { ConsoleTexts } from "data/translations";
import Dialog from "./DialogComponent";
import { DialogTexts } from "data/translations";
import { getGameLanguage } from "../state/selectors";

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

export default forwardRef(({show = false, onCommand = () => {}, onClose = () => {}}, ref) => {
    const language = useSelector(getGameLanguage);
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
        <Dialog show={show} showCloseButton={true} placeOverCharacter={true} onClose={onClose}>
            <Text ref={textRef}>
                {ConsoleTexts.startText[language]}
                <br/>
            </Text>
            <InputWrapper>
                <span>{">"}</span>
                <Input autoFocus={true}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    onBlur={alwaysFocus}
                    value={inputValue}
                    ref={inputRef}/>
            </InputWrapper>  
        </Dialog>
    );
});
