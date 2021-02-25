import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

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

export default ({show = false, onClose = () => {}}) => {
    const dispatch = useDispatch();
    const language = useSelector(getGameLanguage);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();
    const textRef = useRef();
    const [missionStarted, setMissionStarted] = useState(false);
    const mission = null; // Get this from state??

    useEffect(() => {
        if (show) {
            alwaysFocus();
            scrollDown();    
        }
    }, [show]);

    const setText = (text) => {
        addToText(text);
    };

    const startMission = () => {
        if (!mission) {
            setText(ConsoleTexts.missionNotFound[language]);
            return;
        }

        setMissionStarted(true);
        setText(ConsoleTexts.startMission[language]);
        setText("");

        mission.startText[language].forEach(line => {
            setText(line);
        });
    };

    const showHelpText = () => {
        setText(`
            <table>
                <tr>
                    <td>help</td>
                    <td>${ConsoleTexts.help.help[language]}</td>
                </tr>
                <tr>
                    <td>exit</td>
                    <td>${ConsoleTexts.help.exit[language]}</td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>${ConsoleTexts.help.start[language]}</td>
                </tr>
            </table>
        `);
    };

    const onCommand = (command) => {
        if (missionStarted && mission && command === mission.answer) {
            mission.actionText[language].forEach(line => {
                setText(line);
            });

            mission.action(dispatch);
            setTimeout(() => {
                mission.finishText[language].forEach(line => {
                    setText(line);
                });
            }, 1000);
            
            return true;
        }

        if (command === "help") {
            showHelpText();
            return true;
        }

        if (command === "start") {
            startMission();
            return true;
        }

        return false;
    };

    const processCommand = () => {
        if (inputValue === "exit") {
            dialogClose();
            return;
        }

        if (onCommand(inputValue)) return;

        addToText(DialogTexts.commandNotFound(inputValue)[language]);
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
                {ConsoleTexts.start[language]}
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
};
