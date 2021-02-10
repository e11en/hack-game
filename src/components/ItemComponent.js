import React, { useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';

import { GetHealth, GetDamage, DisableObject } from 'state/actions';
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";
import { getCharacterCollidingWith, getCharacterHealth } from "state/selectors";

export default (props) => {
    const dispatch = useDispatch();
    const collidingWith = useSelector(getCharacterCollidingWith);
    const health = useSelector(getCharacterHealth);
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "item", props.x, props.y)) {
            if (props.health && health === 100) return;
            if (props.health)
                dispatch(GetHealth(props.health));

            if (props.damage)
                dispatch(GetDamage(props.damage));
            
            dispatch(DisableObject("item-" + props.x + "-" + props.y));
        }
    }, [collidingWith]);

    return (
        <LevelElement {...props} />
    );
};
