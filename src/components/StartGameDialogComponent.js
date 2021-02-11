import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import { getCharacterImage } from "../state/selectors";
import { ResetHealth } from "state/actions";
import Button from "./ButtonComponent";
import Dialog from "./DialogComponent";
import PlayerPicker from "./PlayerPickerComponent";
import LanguageDialog from "./LanguageDialogComponent";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    & button {
        margin: 5px;
    }
`;

export default ({show = false, setLevel = () => {}, onClose = () => {}}) => {
    const dispatch = useDispatch();
    const [showPlayerPicker, setShowPlayerPicker] = useState(false);
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);
    const characterImage = useSelector(getCharacterImage);

    const onContinue = () => {
        onClose();
    };

    const onPlayerPicker = () => {
        setShowPlayerPicker(false);
        setShowLanguagePicker(true);
    };

    const onFinised = () => {
        setShowLanguagePicker(false);
        dispatch(ResetHealth());
        setLevel(1);
        onClose();
    };

    return (
        <Dialog show={show} showCloseButton={false}>
            <Wrapper>
                <h1>Hack The Class</h1>
                <ButtonWrapper>
                    <Button onClick={() => setShowPlayerPicker(true)}>New game</Button>
                    {
                        characterImage &&
                        <Button onClick={onContinue}>Continue</Button>
                    }
                </ButtonWrapper>
            </Wrapper>
            <PlayerPicker show={showPlayerPicker} onClose={onPlayerPicker}/>
            <LanguageDialog show={showLanguagePicker} onClose={onFinised} />
        </Dialog>
    );
};
