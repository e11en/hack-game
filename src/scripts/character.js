const Direction = {
    DOWN: 0,
    LEFT : 1,
    RIGHT : 2,
    UP : 3
};

class Character extends BaseComponent
{
    constructor(x, y, initialDirection) {
        super(41, 43, "resources/character/girl.png", x, y, (keyPressed) => this.onKeyDown(keyPressed), () => this.onKeyUp());

        this.speedX = 0;
        this.speedY = 0;
        this.animation = {
            direction: initialDirection === undefined ? Direction.RIGHT : initialDirection,
            position: 0,
            frame: 0
        };
    }

    newPos() {
        this.x += this.speedX * 1.5;
        this.y += this.speedY * 1.5;
    };

    onKeyDown(keyPressed)
    {
        if (gameArea.characterIsInteracting) return;

        const direction = this.keyToDirection(keyPressed);
        this.move(direction);

        if(this.canInteract())
            showInformationBox("Press [SPACEBAR] to interact with the computer");
        else
            hideInformationBox();
    }

    onKeyUp()
    {
        this.animation = {
            ...this.animation,
            position: 0,
            frame: 0
        };
    }

    keyToDirection(key)
    {
        switch (key) {
            case "ArrowLeft":
                return Direction.LEFT;
            case "ArrowRight":
                return Direction.RIGHT;
            case "ArrowUp":
                return Direction.UP;
            case "ArrowDown":
                return Direction.DOWN;
            default:
                break;
        }
    }

    move(direction)
    {
        this.speedX = 0;
        this.speedY = 0;

        if (direction === undefined) return;

        if (direction === Direction.LEFT) {
            if (!this.isColliding(objects.filter(obj => obj != this), this.x - 1, this.y))
                this.speedX = -1;
        }
        if (direction === Direction.RIGHT) {
            if (!this.isColliding(objects.filter(obj => obj != this), this.x + 1, this.y))
                this.speedX = 1; 
        }
        if (direction === Direction.UP) { 
            if (!this.isColliding(objects.filter(obj => obj != this), this.x, this.y - 1))
                this.speedY = -1;
        }
        if (direction === Direction.DOWN) { 
            if (!this.isColliding(objects.filter(obj => obj != this), this.x, this.y + 1))
                this.speedY = 1;
        }

        this.determineAnimation(direction);

        this.newPos();
    }

    determineAnimation(newDirection)
    {
        this.animation.frame++;
        if (this.animation.direction !== newDirection)
        {
            this.animation = {
                direction : newDirection,
                position : 0,
                frame : 0
            }
        }
        else if(this.animation.direction == newDirection && this.animation.frame === 5)
        {
            const nextFrame = this.animation.position + 1;
            this.animation.position = nextFrame > 3 ? 0 : nextFrame;
            this.animation.frame = 0;
        }
    }

    canInteract()
    {
        if (this.isColliding(objects.filter(obj => obj != this && obj.hasInteraction), this.x - 1, this.y))
            return true;
        if (this.isColliding(objects.filter(obj => obj != this && obj.hasInteraction),this.x + 1, this.y))
            return true;
        if (this.isColliding(objects.filter(obj => obj != this && obj.hasInteraction),this.x, this.y - 1))
            return true;
        if (this.isColliding(objects.filter(obj => obj != this && obj.hasInteraction),this.x, this.y + 1))
            return true;

        return false;
    }

    update()
    {
        var ctx = gameArea.context;
        ctx.drawImage(this.image,
            this.animation.position * this.width,
                      this.animation.direction * this.height,
                      this.width,
                      this.height,
                      this.x,
                      this.y,
                      this.width, 
                      this.height);
    }
}