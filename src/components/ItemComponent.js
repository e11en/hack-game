import React, { useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';

import { GetHealth } from 'state/actions';
import { idEquals } from "helpers/collision";
import LevelElement from "./LevelElementComponent";

export default (props) => {
    const dispatch = useDispatch();
    const collidingWith = useSelector((state) => state.character.collidingWith);
    
    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "item", props.x, props.y)) {
            dispatch(GetHealth(props.health));
            props.disable("item-" + props.x + "-" + props.y);
        }
    }, [collidingWith]);

    return (
        <LevelElement {...props} />
    );
};
