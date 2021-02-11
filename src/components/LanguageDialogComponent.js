import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import Dialog from "./DialogComponent";
import { SetLanguage } from "state/actions";
import { LanguagePickerTexts } from "data/translations";
import { getGameLanguage } from "state/selectors";

const Options = styled.div`
    display: flex;
    justify-content: center;
`;

const Option = styled.div`
    margin: 5px;

    img {
        width: 120px;
    }
    img:hover {
        outline: 3px solid #3b9e1c;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-top: 0;
`;

export default ({show = false, onClose = () => {}}) => {
    const dispatch = useDispatch();
    const language = useSelector(getGameLanguage);
    const languages = [
        {
            name: "English",
            short: "EN"
        },
        {
            name: "Nederlands",
            short: "NL"
        }
    ];

    const onClick = (lang) => {
        dispatch(SetLanguage(lang));
        onClose();
    }
    
    return (
        <Dialog show={show} showCloseButton={false}>
            <Title>{LanguagePickerTexts.chooseLanguageText[language]}</Title>
            <Options>
                {
                    languages.map(lang => 
                                <Option key={lang.short} onClick={() => onClick(lang.short)}>
                                    <img src={process.env.PUBLIC_URL + "resources/flags/" + lang.short + ".png"} alt={"Choose " + lang.name + " language"}/>
                                </Option>)
                }
            </Options>
        </Dialog>
    );
};
