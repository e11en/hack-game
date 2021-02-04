import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { GoLeft, GoRight, GoUp, GoDown } from 'state/actions';
import Character from "./CharacterComponent";
import { Direction } from "../constants";

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
    const x = useSelector((state) => state.character.x);
    const y = useSelector((state) => state.character.y);
    const [heldDirections, setHeldDirections] = useState([]);

    const move = () => {
        const direction = heldDirections[0];
        if (direction === Direction.RIGHT) dispatch(GoRight());
        if (direction === Direction.LEFT) dispatch(GoLeft());
        if (direction === Direction.UP) dispatch(GoUp());
        if (direction === Direction.DOWN) dispatch(GoDown());
    }

    const startWalking = (newDirection) => {
        setIsWalking(true);
        const arr = heldDirections;
        arr.unshift(newDirection);
        setHeldDirections(arr);
        setDirection(newDirection);
        move();
    };

    const keyDown = (e) => {
        const newDirection = keyToDirection(e.key);
        if (newDirection !== null || newDirection !== undefined)
            startWalking(newDirection);
    }

    const keyUp = (e) => {
        setIsWalking(false);
    }

    const collisionCallback = (isColliding, collidingWith) => {
        console.log(isColliding, collidingWith);
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDown, false);
        document.addEventListener("keyup", keyUp, false);

        return () => {
            document.removeEventListener("keydown", keyDown, false);
            document.removeEventListener("keyup", keyUp, false);
        };
    }, []);

    return (
        <Character imageSrc="resources/characters/player/player.png" direction={direction} isWalking={isWalking} x={x} y={y} collisionCallback={collisionCallback}/>
    );
};
