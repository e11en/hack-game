import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { SetColliding } from 'state/actions';
import { hitTest } from "helpers/collision";
import { GoLeft, GoRight, GoUp, GoDown } from 'state/actions';
import { Direction } from "../helpers/constants";
import Character from "./CharacterComponent";
import { 
    getCharacterX, 
    getCharacterY, 
    getCharacterCollidingWith, 
    getGameOver, 
    getCharacterHealth, 
    getMapObjects, 
    getCharacterCollidingDirection,
    getCharacterIsColliding,
    getCharacterSpeed
} from "../state/selectors";

const keyToDirection = (key) => {
    switch (key) {
        case "ArrowLeft": return Direction.LEFT;
        case "ArrowRight": return Direction.RIGHT;
        case "ArrowUp": return Direction.UP;
        case "ArrowDown": return Direction.DOWN;
        default: return null;
    }
}

export default (props) => {
    const dispatch = useDispatch();

    const [direction, setDirection] = useState(Direction.DOWN);
    const [isWalking, setIsWalking] = useState(false);
    const [heldDirections, setHeldDirections] = useState([]);

    const mapObjectsState = useSelector(getMapObjects);
    const x = useSelector(getCharacterX);
    const y = useSelector(getCharacterY);
    const health = useSelector(getCharacterHealth);
    const collidingWith = useSelector(getCharacterCollidingWith);
    const isColliding = useSelector(getCharacterIsColliding);
    const characterSpeed = useSelector(getCharacterSpeed);
    const collidingDirection = useSelector(getCharacterCollidingDirection);
    const isGameOver = useSelector(getGameOver);

    const move = (direction, speed) => {
        if (direction === Direction.RIGHT) dispatch(GoRight(speed));
        if (direction === Direction.LEFT) dispatch(GoLeft(speed));
        if (direction === Direction.UP) dispatch(GoUp(speed));
        if (direction === Direction.DOWN) dispatch(GoDown(speed));
    }

    const startWalking = (newDirection) => {
        setIsWalking(true);
        const arr = heldDirections;
        arr.unshift(newDirection);
        setHeldDirections(arr);
        setDirection(newDirection);
        move(heldDirections[0], characterSpeed);
    };

    const keyDown = (e) => {
        const newDirection = keyToDirection(e.key);
        if (newDirection !== null && newDirection !== undefined && !isGameOver) {
            startWalking(newDirection);
        }
    }

    const keyUp = (e) => {
        setIsWalking(false);
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);

        return () => {
            document.removeEventListener("keydown", keyDown);
            document.removeEventListener("keyup", keyUp);
        };
    }, [isColliding]);

    useEffect(() => {
        if (collidingDirection !== null)
            move(collidingDirection, -1);

    }, [collidingDirection]);

    useEffect(() => {
        move(collidingDirection, -20);
    }, [health]);

    const hasCollision = (collisionObject, collidingDirection) => {
        if(!isColliding || collidingWith !== collisionObject) {
            dispatch(SetColliding(true, collisionObject, collidingDirection));
        }
    };

    useEffect(() => {
        const result = hitTest(mapObjectsState, {x, y, width: 32, height: 32});
        if (result)
            hasCollision(result[0], result[1]);
        else 
            dispatch(SetColliding(false, null, null));
    }, [x, y]);

    return (
        <Character imageSrc="resources/characters/player.png"
                    direction={direction} 
                    isWalking={isWalking}
                    x={x} 
                    y={y}
                    {...props}/>
    );
};
