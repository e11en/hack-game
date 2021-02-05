import React, { useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { GetDamage } from 'state/actions';
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";

const Laser = styled(LevelElement)`
    display: flex;
    
    & img {
        flex: 1;
    }
`;

export default (props) => {
    const dispatch = useDispatch();
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const health = useSelector((state) => state.character.health);

    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "laser", props.x, props.y)) {
            dispatch(GetDamage(props.damage ? props.damage : 1));
        }
    }, [collidingWith]);

    console.log(health);

    return (
        <Laser imageSource="resources/level-elements/laser.png" {...props} />
    );
};
