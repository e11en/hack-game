import { useState } from 'react';

import { MovementSpeed } from "../constants";

export default (canCollideWith, x, y, elementRef) => {
    const [isColliding, setIsColliding] = useState(false);
    const [collidingWith, setCollidingWith] = useState(null);

    const hittestSingleSide = (collingWith, x, y) =>
    {
        let collidingObject;
        collingWith.filter(obj => obj.enabled).forEach(obj => {
            if (x < obj.x + obj.width  && x + elementRef.current.offsetWidth  > obj.x &&
                y < obj.y + obj.height && y + elementRef.current.offsetHeight > obj.y) {
                    collidingObject = obj;
                    return;
            }
        });

        return collidingObject;
    }

    const hasCollision = (collisionObject) => {
        setIsColliding(true);
        setCollidingWith(collisionObject);
        console.log("collision", collisionObject);
    }

    if (!elementRef || !elementRef.current)
        return [isColliding, collidingWith];

    const collidingLeft = hittestSingleSide(canCollideWith, x - MovementSpeed, y);
    if (collidingLeft)
        hasCollision(collidingLeft);

    const collidingRight = hittestSingleSide(canCollideWith, x + MovementSpeed, y);
    if (collidingLeft)
        hasCollision(collidingRight);

    const collidingUp = hittestSingleSide(canCollideWith, x, y - MovementSpeed);
    if (collidingLeft)
        hasCollision(collidingUp);

    const collidingDown = hittestSingleSide(canCollideWith, x, y + MovementSpeed);
    if (collidingLeft)
        hasCollision(collidingDown);

    return [isColliding, collidingWith];
};