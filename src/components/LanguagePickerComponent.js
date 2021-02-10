import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { SetLanguage } from "state/actions";

const Picker = styled.div`
    float: right;
    margin-right: 3px;

    &:hover {
        cursor: pointer;
    }
`;

const Select = styled.div`
`;

const Option = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

export default (props) => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.game.language);
    const [showOptions, setShowOptions] = useState(false);
    const languages = [
        "EN",
        "NL"
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
                <Select>
                    {
                        languages.filter(lang => lang !== language)
                                 .map(lang => 
                                    <Option key={lang} onClick={() => onClick(lang)}>
                                        <img src={process.env.PUBLIC_URL + "resources/flags/" + lang + ".png"} alt={"Choose " + lang + " language"}/>
                                    </Option>)
                    }
                </Select>
            }
        </Picker>
    );
};
