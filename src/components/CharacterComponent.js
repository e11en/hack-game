import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { SetColliding } from 'state/actions';
import { MapObjectsContext } from "contexts";
import { Direction, MovementSpeed } from "../constants";

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
`;

const PixelArt = styled.img`
    image-rendering: pixelated;
`;

const moveSpritesheet = keyframes`
    from {
        transform: translate3d(0,0,0);
    }
    to {
        transform: translate3d(-100%,0,0);
    }
`;

const SpriteSheet = styled(PixelArt)`
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

export default ({imageSrc = "resources/characters/player/player.png", direction = Direction.DOWN, isWalking = false, x = 0, y = 0, width = 32, height = 32}) => {
    const mapObjectsContext = useContext(MapObjectsContext);
    const [directionClassName, setDirectionClassName] = useState(getDirectionClassName(direction));
    const [position, setPosition] = useState({x: x, y: y});
    const characterRef = useRef();
    const dispatch = useDispatch();
    const isCollidingState = useSelector((state) => state.character.isColliding);
    const collidingWithState = useSelector((state) => state.character.collingWith);

    const hittest = (collingWith, x, y) =>
    {
        let collidingObject;
        collingWith.filter(obj => obj.enabled).forEach(obj => {
            if (x < obj.x + obj.hitBox.width  && x + width  > obj.x &&
                y < obj.y + obj.hitBox.height && y + height > obj.y) {
                    collidingObject = obj;
                    return;
            }
        });

        return collidingObject;
    }

    const hasCollision = (isColliding, collisionObject, collidingDirection) => {
        if(isColliding !== isCollidingState || collidingWithState !== collisionObject) {
            dispatch(SetColliding(isColliding, collisionObject, collidingDirection));
        }
    }

    const hitTest = () => {
        if (!characterRef || !characterRef.current)
            return;

        const collidingLeft = hittest(mapObjectsContext, x - MovementSpeed, y);
        if (collidingLeft) {
            hasCollision(true, collidingLeft, Direction.LEFT);
            return;
        }

        const collidingRight = hittest(mapObjectsContext, x + MovementSpeed, y);
        if (collidingRight) {
            hasCollision(true, collidingRight, Direction.RIGHT);
            return;
        }

        const collidingUp = hittest(mapObjectsContext, x, y - MovementSpeed);
        if (collidingUp) {
            hasCollision(true, collidingUp, Direction.UP);
            return;
        }

        const collidingDown = hittest(mapObjectsContext, x, y + MovementSpeed);
        if (collidingDown) {
            hasCollision(true, collidingDown, Direction.DOWN);
            return;
        }

        hasCollision(false, null, null);
    };

    useEffect(() => {
        setDirectionClassName(getDirectionClassName(direction));
    }, [direction]);

    useEffect(() => {
        hitTest();
        setPosition({x: x, y: y});
    }, [x, y]);

    return (
        <Character position={position} ref={characterRef}>
            <SpriteSheet src={process.env.PUBLIC_URL + imageSrc} className={`${directionClassName} ${isWalking ? "walking" : ""}`} />
        </Character>
    );
};