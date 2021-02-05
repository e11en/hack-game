import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { SetColliding } from 'state/actions';
import { MapObjectsContext } from "state/contexts";
import { Direction } from "../helpers/constants";
import { hitTest } from "helpers/collision";

const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));

const Character = styled.div.attrs(props => ({
    style: {
        transform: `translate3d(${props.position.x * pixelSize}px, ${props.position.y * pixelSize}px, 0)`
    },
}))
`
    width: calc(32px * var(--pixel-size));
    height: calc(32px * var(--pixel-size));
    overflow: hidden;
    position: absolute;
    outline: ${props => props.showOutline ? 3 : 0}px solid cyan;
`;

const moveSpritesheet = keyframes`
    from {
        transform: translate3d(0,0,0);
    }
    to {
        transform: translate3d(-100%,0,0);
    }
`;

const SpriteSheet = styled.img`
    position: relative;
    width: calc(96px * var(--pixel-size));

    &.walking {
        animation: ${moveSpritesheet} 1s steps(3) infinite;
    }
    &.face-up {
        top: 0;
    }
    &.face-left {
        top: calc(-32px * var(--pixel-size));
    }
    &.face-right {
        top: calc(-64px * var(--pixel-size));
    }
    &.face-up {
        top: calc(-96px * var(--pixel-size));
    }
`;

const getDirectionClassName = (direction) => {
    switch (direction) {
        case Direction.UP: return "face-up";
        case Direction.DOWN: return "face-down";
        case Direction.LEFT: return "face-left";
        case Direction.RIGHT: return "face-right";
        default: return null;
    }
}

export default ({imageSrc = "resources/characters/player.png", direction = Direction.DOWN, isWalking = false, x = 0, y = 0, width = 32, height = 32, showOutline = false}) => {
    const mapObjectsContext = useContext(MapObjectsContext);
    const [directionClassName, setDirectionClassName] = useState(getDirectionClassName(direction));
    const [position, setPosition] = useState({x: x, y: y});
    const characterRef = useRef();
    const dispatch = useDispatch();
    const isCollidingState = useSelector((state) => state.character.isColliding);
    const collidingWithState = useSelector((state) => state.character.collingWith);

    const hasCollision = (collisionObject, collidingDirection) => {
        if(!isCollidingState || collidingWithState !== collisionObject) {
            dispatch(SetColliding(true, collisionObject, collidingDirection));
        }
    }
    useEffect(() => {
        setDirectionClassName(getDirectionClassName(direction));
    }, [direction]);

    useEffect(() => {
        if (!characterRef || !characterRef.current) return;
        
        const result = hitTest(mapObjectsContext, {x, y, width, height});
        if (result)
            hasCollision(result[0], result[1]);
        else 
            dispatch(SetColliding(false, null, null));

        setPosition({x: x, y: y});
    }, [x, y]);

    return (
        <Character position={position} ref={characterRef} showOutline={showOutline}>
            <SpriteSheet src={process.env.PUBLIC_URL + imageSrc} className={`${directionClassName} ${isWalking ? "walking" : ""}`} />
        </Character>
    );
};