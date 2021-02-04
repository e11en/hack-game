import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { GoLeft, GoRight, GoUp, GoDown } from 'state/actions';
import Character from "./CharacterComponent";
import { Direction } from "../helpers/constants";

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
    const isColliding = useSelector((state) => state.character.isColliding);
    const characterSpeed = useSelector((state) => state.character.speed);
    const collidingDirection = useSelector((state) => state.character.collidingDirection);
    const [heldDirections, setHeldDirections] = useState([]);

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
        if (newDirection !== null && newDirection !== undefined && !isColliding) {
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
        if (collidingDirection !== null) {
            move(collidingDirection, -1);
        }

    }, [collidingDirection]);

    return (
        <Character imageSrc="resources/characters/player/player.png"
                    direction={direction} 
                    isWalking={isWalking}
                    width={32}
                    height={32}
                    x={x} 
                    y={y}
                    {...props}/>
    );
};
