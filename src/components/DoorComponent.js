import React, { useEffect, useState }  from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";
import { DoorTexts } from "data/translations";
import { getCharacterCollidingWith, getGameLanguage } from "state/selectors";
import Button from "./ButtonComponent";

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

const StyledButton = styled(Button)`
    position: absolute;
    bottom: 20px;
`;

export default (props) => {
    const language = useSelector(getGameLanguage);
    const collidingWith = useSelector(getCharacterCollidingWith);
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
        console.error("Input check not yet implemented.");
        if (inputValue === "CTF{CAESAR_CIPHER_IS_NOT_SECURE}") {
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
            <Dialog show={showDialog} onClose={onClose} placeOverCharacter={true}>
                <Wrapper>
                    <Text>{DoorTexts.enterTokenText[language]}<br/></Text>
                    <Input autoFocus={true} value={inputValue} onChange={onChange}/>
                    {
                        hasError &&
                        <ErrorText>{DoorTexts.errorText[language]}</ErrorText>
                    }
                    <StyledButton onClick={onClick}>{DoorTexts.buttonText[language]}</StyledButton>
                </Wrapper>
            </Dialog>
            <Door imageSource="resources/level-elements/door.png" {...props} />
        </React.Fragment>
    );
};
