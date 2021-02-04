import { SetColliding } from 'state/actions';
import { Direction, MovementSpeed } from "./constants";

const singleHitTest = (collingWith, x, y, hitTester) =>
{
    let collidingObject;
    collingWith.filter(obj => obj.enabled).forEach(obj => {
        const hitBoxWidth = obj.hitBox ? obj.hitBox.width : obj.width;
        const hitBoxHeight = obj.hitBox ? obj.hitBox.height : obj.height;

        if (x < obj.x + hitBoxWidth  && x + hitTester.width  > obj.x &&
            y < obj.y + hitBoxHeight && y + hitTester.height > obj.y) {
                collidingObject = obj;
                return;
        }
    });

    return collidingObject;
}

const hasCollision = (isColliding, collisionObject, collidingDirection, isCollidingState, collidingWithState, dispatch) => {
    if(isColliding !== isCollidingState || collidingWithState !== collisionObject) {
        dispatch(SetColliding(isColliding, collisionObject, collidingDirection));

        if (collisionObject && collisionObject.hasInteraction)
        {
            console.log("CAN INTERACT");
        }
    }
}

export const hitTest = (collisionObjects, isCurrentlyColliding, currentCollidingWith, hitTester, dispatch) => {
    const collidingLeft = singleHitTest(collisionObjects, hitTester.x - MovementSpeed, hitTester.y, hitTester);
    if (collidingLeft) {
        hasCollision(true, collidingLeft, Direction.LEFT, isCurrentlyColliding, currentCollidingWith, dispatch);
        return;
    }

    const collidingRight = singleHitTest(collisionObjects, hitTester.x + MovementSpeed, hitTester.y, hitTester);
    if (collidingRight) {
        hasCollision(true, collidingRight, Direction.RIGHT, isCurrentlyColliding, currentCollidingWith, dispatch);
        return;
    }

    const collidingUp = singleHitTest(collisionObjects, hitTester.x, hitTester.y - MovementSpeed, hitTester);
    if (collidingUp) {
        hasCollision(true, collidingUp, Direction.UP, isCurrentlyColliding, currentCollidingWith, dispatch);
        return;
    }

    const collidingDown = singleHitTest(collisionObjects, hitTester.x, hitTester.y + MovementSpeed, hitTester);
    if (collidingDown) {
        hasCollision(true, collidingDown, Direction.DOWN, isCurrentlyColliding, currentCollidingWith, dispatch);
        return;
    }

    hasCollision(false, null, null, isCurrentlyColliding, currentCollidingWith, dispatch);
};