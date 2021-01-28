class BaseComponent {
    constructor(width, height, imagePath, x, y, keyDown, keyUp) {
        this.image = new Image();
        this.image.src = imagePath;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.hasInteraction = false;
        this.keyDown = keyDown !== undefined ? keyDown : () => {};
        this.keyUp = keyUp !== undefined ? keyUp : () => {};
        this.enabled = true;
    }

    update() {
        var ctx = gameArea.context;
        ctx.drawImage(this.image,
                      this.x,
                      this.y,
                      this.width, 
                      this.height);
    }

    isColliding(collingWith, x, y)
    {
        let collidingObject;
        collingWith.filter(obj => obj.enabled).forEach(obj => {
            if (x < obj.x + obj.width  && x + this.width  > obj.x &&
                y < obj.y + obj.height && y + this.height > obj.y) {
                    collidingObject = obj;
                    return;
            }
        });

        return collidingObject;
    }

    hitTest(collingWith, x, y, movementSpeed)
    {
        const collidingLeft = this.isColliding(collingWith, x - movementSpeed, y);
        const collidingRight = this.isColliding(collingWith, x + movementSpeed, y);
        const collidingUp = this.isColliding(collingWith, x, y - movementSpeed);
        const collidingDown = this.isColliding(collingWith, x, y + movementSpeed);
        const hasCollision = collidingLeft || collidingRight || collidingUp || collidingDown;

        return {
            left: collidingLeft,
            right: collidingRight,
            up: collidingUp,
            down: collidingDown,
            hasCollision: hasCollision
        };
    }
}