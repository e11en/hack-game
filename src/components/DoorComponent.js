import React, { useEffect, useState }  from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";
import { DoorTexts } from "data/translations";

const Door = styled(LevelElement)`
    display: flex;
    
    & img {
        flex: 1;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Text = styled.p`
    margin: 30px 5px;
`;

const ErrorText = styled.p`
    color: #c31818;
`;

const Input = styled.input`
    width: 350px;
    border: 3px solid #3b9e1c;
    background-color: #35312b;
    color: #3b9e1c;

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    position: absolute;
    bottom: 20px;
    border: 3px solid #3b9e1c;
    color: #3b9e1c;
    background-color: transparent;

    &:hover {
        background-color: #3b9e1c;
        color: #35312b;
    }

    &:active {
        background-color: #225d0f;
        color: #3b9e1c;
    }

    &:focus {
        outline: none;
    }
`;

export default (props) => {
    const language = useSelector((state) => state.game.language);
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "door", props.x, props.y) && !showDialog) {
            setShowDialog(true);
        }
    }, [collidingWith]);

    const onChange = (e) => {
        setInputValue(e.target.value);
        setHasError(false);
    };

    const onClick = () => {
        // TODO: Add animation and call to backend
        if (inputValue === "CTF{THIS_IS_A_TEST}") {
            setShowDialog(false);
            props.changeLevel(2);
        }
        else
            setHasError(true);
    };

    const onClose = () => {
        setShowDialog(false);
        setInputValue("");
    };

    return (
        <React.Fragment>
            <Dialog show={showDialog} onClose={onClose} hasInput={false}>
                <Wrapper>
                    <Text>{DoorTexts.enterTokenText[language]}<br/></Text>
                    <Input autoFocus={true} value={inputValue} onChange={onChange}/>
                    {
                        hasError &&
                        <ErrorText>{DoorTexts.errorText[language]}</ErrorText>
                    }
                    <Button onClick={onClick}>{DoorTexts.buttonText[language]}</Button>
                </Wrapper>
            </Dialog>
            <Door imageSource="resources/level-elements/door.png" {...props} />
        </React.Fragment>
    );
};
