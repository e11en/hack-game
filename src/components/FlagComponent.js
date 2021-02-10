import React, { useEffect, useState }  from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import Dialog from "./DialogComponent";
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";
import { FlagTexts } from "data/translations";
import { getCharacterCollidingWith, getGameLanguage } from "state/selectors";

const Flag = styled(LevelElement)`
    display: flex;
    
    & img {
        flex: 1;
    }
`;

const Text = styled.div`
    margin: 5px;
    height: 100%;
`;

export default (props) => {
    const language = useSelector(getGameLanguage);
    const collidingWith = useSelector(getCharacterCollidingWith);
    const [showDialog, setShowDialog] = useState(false);
    const [text, setText] = useState("");
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "flag", props.x, props.y) && !showDialog) {
            setShowDialog(true);
            setText(collidingWith.text);
        }
    }, [collidingWith]);

    return (
        <React.Fragment>
            <Dialog show={showDialog} onClose={() => setShowDialog(false)} hasInput={false}>
                <Text dangerouslySetInnerHTML={{__html: FlagTexts.tokenText[language] + "CTF{" + text  + "}<br/>"}}/>
            </Dialog>
            <Flag imageSource="resources/level-elements/flag.png" {...props} />
        </React.Fragment>
    );
};
