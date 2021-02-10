import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from 'react-redux';

import { idEquals } from "helpers/collision";
import { Direction, getPixelSize } from "../helpers/constants";
import SpeechDialog from "components/SpeechDialogComponent";

const Character = styled.div.attrs(props => ({
    style: {
        transform: `translate3d(${props.position.x * getPixelSize()}px, ${props.position.y * getPixelSize()}px, 0)`
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

export default ({imageSrc = "resources/characters/female-1.png", direction = Direction.DOWN, isWalking = false, x = 0, y = 0, showOutline = false, text = {}}) => {
    const characterRef = useRef();
    const collidingWith = useSelector((state) => state.character.collidingWith);
    const [directionClassName, setDirectionClassName] = useState(getDirectionClassName(direction));
    const [position, setPosition] = useState({x: x, y: y});
    const [showSpeechDialog, setShowSpeechDialog] = useState(false);
    
    useEffect(() => {
        setDirectionClassName(getDirectionClassName(direction));
    }, [direction]);

    useEffect(() => {
        if (!characterRef || !characterRef.current) return;
        
        setPosition({x: x, y: y});
    }, [x, y]);

    useEffect(() => {
        if (collidingWith && idEquals(collidingWith.id, "character", x, y)) {
            setShowSpeechDialog(true);
        }
    }, [collidingWith]); 

    return (
        <React.Fragment>
            <Character position={position} ref={characterRef} showOutline={showOutline}>
                <SpriteSheet src={process.env.PUBLIC_URL + imageSrc} className={`${directionClassName} ${isWalking ? "walking" : ""}`} />
            </Character>
            <SpeechDialog show={showSpeechDialog} text={text} onClose={() => setShowSpeechDialog(false)}/>
        </React.Fragment>
    );
};