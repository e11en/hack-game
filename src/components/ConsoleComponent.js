import React,{ useState, useEffect, useRef }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { IsInteracting } from 'state/actions';
import LevelElement from "./LevelElementComponent";
import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";

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

export default ({x = 0, y = 0, width = 64, height = 49, ...props}) => {
    const dispatch = useDispatch();
    const canInteract = useSelector((state) => state.character.canInteract);
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const inputRef = useRef();

    const [showDialog, setShowDialog] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (canInteract && collidingWith && idEquals(collidingWith.id, "console", x, y)) {
            setShowDialog(canInteract);
            dispatch(IsInteracting(true));
        }
    }, [canInteract, collidingWith]);

    useEffect(() => {
        if (showDialog)
            alwaysFocus();
    }, [showDialog]);

    const alwaysFocus = () => {
        if (inputRef && inputRef.current)
        inputRef.current.focus();
    }

    const onKeyUp = (e) => {
        if (e.key === "Enter" && e.target.value === "exit")
            dialogClose();
    };

    const dialogClose = () => {
        setInputValue("");
        setShowDialog(false);
        dispatch(IsInteracting(false));
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} variant="console" onClose={dialogClose}>
                <Text>Hallo, dit is een test 123</Text>
                <InputWrapper>
                    <span>{">"}</span>
                    <Input autoFocus={true}
                        onKeyUp={onKeyUp}
                        onChange={(e) => setInputValue(e.target.value)}
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
