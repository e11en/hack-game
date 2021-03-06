import { Direction, MovementSpeed } from "./constants";

const singleHitTest = (collidingWith, x, y, hitTester) =>
{
    let collidingObject;
    const enabledObject = [];
    Object.keys(collidingWith).forEach(key => {
        if (collidingWith[key].enabled) enabledObject.push(collidingWith[key]);
    });

    enabledObject.forEach(obj => {
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

export const hitTest = (collisionObjects, hitTester) => {
    const collidingLeft = singleHitTest(collisionObjects, hitTester.x - MovementSpeed, hitTester.y, hitTester);
    if (collidingLeft) return [collidingLeft, Direction.LEFT];

    const collidingRight = singleHitTest(collisionObjects, hitTester.x + MovementSpeed, hitTester.y, hitTester);
    if (collidingRight) return [collidingRight, Direction.RIGHT];

    const collidingUp = singleHitTest(collisionObjects, hitTester.x, hitTester.y - MovementSpeed, hitTester);
    if (collidingUp) return [collidingUp, Direction.UP];

    const collidingDown = singleHitTest(collisionObjects, hitTester.x, hitTester.y + MovementSpeed, hitTester);
    if (collidingDown) return [collidingDown, Direction.DOWN];

    return;
};

export const idEquals = (id, type, x, y) => {
    return id === type + "-" + x + "-" + y;
}