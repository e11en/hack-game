import React,{ useState, useEffect, useRef }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { IsInteracting } from 'state/actions';
import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

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

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const dispatch = useDispatch();
    const canInteract = useSelector((state) => state.character.canInteract);
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const inputRef = useRef();
    const textRef = useRef();

    const [showDialog, setShowDialog] = useState(true);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (canInteract && collidingWith && idEquals(collidingWith.id, "console", x, y)) {
            setShowDialog(canInteract);
            dispatch(IsInteracting(true));
        }
    }, [canInteract, collidingWith]);

    useEffect(() => {
        if (showDialog) {
            alwaysFocus();
        
        scrollDown();    
        }
    }, [showDialog]);

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

    const addInputToText = () => {
        addToText("> " + inputValue);
    };

    const addToText = (text) => {
        if (textRef && textRef.current)
            textRef.current.innerHTML += text + "<br/>";

        scrollDown();
    };

    const showHelpText = () => {
        addToText(`
            <table>
                <tr>
                    <td>help</td>
                    <td>Show all commands.</td>
                </tr>
                <tr>
                    <td>exit</td>
                    <td>Exit this window.</td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>Start a mission. (example: start Yt8fiW)</td>
                </tr>
            </table>
        `);
    };

    const startMission = (missionId) => {
        const mockMissionIds = ["abc123", "matrix"];
        if (!mockMissionIds.includes(missionId)) {
            addToText("Mission with id '" + missionId + "' is not found.");
            return;
        }

        console.log("missionId", missionId);
        addToText("Starting mission...");
    };

    const processCommand = () => {
        if (inputValue.includes("start")) {
            const input = inputValue.split(" ").filter(i => i && i !== "start");
            if (input.length > 1) {
                addToText("A mission id can only be one word. (example: start Yt8fiW)");
                return;
            }
            else if (input.length === 0) {
                addToText("No mission id provided. (example: start Yt8fiW)");
                return;
            }

            startMission(input[0]);
            return;
        }

        switch(inputValue) {
            case "help": 
                showHelpText();
                break;
            case "exit": 
                dialogClose();
                break;
            default:
                addToText("Command '" + inputValue + "' is not found.");
                break;
        }
    };

    const onKeyUp = (e) => {
        if (e.key === "Enter") {
            addInputToText();
            processCommand();
            setInputValue("");
        }
    };

    const dialogClose = () => {
        setInputValue("");
        setShowDialog(false);
        dispatch(IsInteracting(false));
        textRef.current.innerHTML = "Type 'help' to show all available command. <br/>";
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} variant="console" onClose={dialogClose}>
                <Text ref={textRef}>
                    Type 'help' to show all available command. <br/>
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
            <LevelElement x={x} 
                        y={y} 
                        imageSource="resources/level-elements/console.png"
                        width={width}
                        height={height}
                        {...props} />
        </React.Fragment>
    );
};
