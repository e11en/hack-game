import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { SetLanguage } from "state/actions";
import { LanguagePickerTexts } from "data/translations";

const Picker = styled.div`
    float: right;
    margin-right: 3px;

    &:hover {
        cursor: pointer;
    }
`;

const OptionsDialog = styled.div`
    position: fixed;
    background-color: #FFF;
    top: 170px;
    left: 170px;
    border: 5px solid #000;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Options = styled.div`
    display: flex;
`;

const Option = styled.div`
    margin: 5px;

    img {
        width: 120px;
    }
    img:hover {
        outline: 3px solid #000;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Close = styled.div`
    position: absolute;
    top: 0px;
    right: 7px;

    &:hover {
        color: #7d7d7d;
        cursor: pointer;
    }
`;

const Title = styled.h2`
    margin-top: 0;
`;

export default (props) => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.game.language);
    const [showOptions, setShowOptions] = useState(false);
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
        setShowOptions(false);
    }
    
    return (
        <Picker {...props}>
            <img src={process.env.PUBLIC_URL + "resources/flags/" + language + ".png"} alt="Selected language flag" onClick={() => setShowOptions(!showOptions)}/>
            {
                showOptions &&
                <OptionsDialog>
                    <Close onClick={() => setShowOptions(false)}>x</Close>
                    <Title>{LanguagePickerTexts.chooseLanguageText[language]}</Title>
                    <Options>
                        {
                            languages.map(lang => 
                                        <Option key={lang.short} onClick={() => onClick(lang.short)}>
                                            <img src={process.env.PUBLIC_URL + "resources/flags/" + lang.short + ".png"} alt={"Choose " + lang.name + " language"}/>
                                        </Option>)
                        }
                    </Options>
                </OptionsDialog>
            }
        </Picker>
    );
};
