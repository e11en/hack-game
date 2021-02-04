import { SetColliding } from 'state/actions';
import { Direction, MovementSpeed } from "./constants";

const singleHitTest = (collingWith, x, y, width, height) =>
{
    let collidingObject;
    collingWith.filter(obj => obj.enabled).forEach(obj => {
        const hitBoxWidth = obj.hitBox ? obj.hitBox.width : obj.width;
        const hitBoxHeight = obj.hitBox ? obj.hitBox.height : obj.height;

        if (x < obj.x + hitBoxWidth  && x + width  > obj.x &&
            y < obj.y + hitBoxHeight && y + height > obj.y) {
                collidingObject = obj;
                return;
        }
    });

    return collidingObject;
}

const hasCollision = (isColliding, collisionObject, collidingDirection, isCollidingState, collidingWithState, dispatch) => {
    if(isColliding !== isCollidingState || collidingWithState !== collisionObject) {
        dispatch(SetColliding(isColliding, collisionObject, collidingDirection));
    }
}

export const hitTest = (characterRef, mapObjectsContext, isCollidingState, collidingWithState, x, y, width, height, dispatch) => {
    if (!characterRef || !characterRef.current)
        return;

    const collidingLeft = singleHitTest(mapObjectsContext, x - MovementSpeed, y, width, height);
    if (collidingLeft) {
        hasCollision(true, collidingLeft, Direction.LEFT, isCollidingState, collidingWithState, dispatch);
        return;
    }

    const collidingRight = singleHitTest(mapObjectsContext, x + MovementSpeed, y, width, height);
    if (collidingRight) {
        hasCollision(true, collidingRight, Direction.RIGHT, isCollidingState, collidingWithState, dispatch);
        return;
    }

    const collidingUp = singleHitTest(mapObjectsContext, x, y - MovementSpeed, width, height);
    if (collidingUp) {
        hasCollision(true, collidingUp, Direction.UP, isCollidingState, collidingWithState, dispatch);
        return;
    }

    const collidingDown = singleHitTest(mapObjectsContext, x, y + MovementSpeed, width, height);
    if (collidingDown) {
        hasCollision(true, collidingDown, Direction.DOWN, isCollidingState, collidingWithState, dispatch);
        return;
    }

    hasCollision(false, null, null, isCollidingState, collidingWithState, dispatch);
};