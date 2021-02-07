import React, { useEffect }  from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";

const Flag = styled(LevelElement)`
    display: flex;
    
    & img {
        flex: 1;
    }
`;

export default (props) => {
    const collidingWith = useSelector((state) => state.character.collidingWith);
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "flag", props.x, props.y)) {
            // TODO: show dialog with the CTF token
        }
    }, [collidingWith]);

    return (
        <Flag imageSource="resources/level-elements/flag.png" {...props} />
    );
};
