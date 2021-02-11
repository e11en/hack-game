import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import { getGameLanguage } from "state/selectors";
import LanguageDialog from "./LanguageDialogComponent";

const Picker = styled.div`
    float: right;
    margin-right: 3px;

    &:hover {
        cursor: pointer;
    }
`;

export default (props) => {
    const language = useSelector(getGameLanguage);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <Picker>
            <img src={process.env.PUBLIC_URL + "resources/flags/" + language + ".png"} alt="Selected language flag" onClick={() => setShowOptions(!showOptions)}/>
            <LanguageDialog show={showOptions} onClose={() => setShowOptions(false)} />
        </Picker>
    );
};
