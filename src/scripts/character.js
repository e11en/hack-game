class Character extends BaseComponent
{
    constructor(x, y) {
        super(28, 38, "resources/character/right.png", x, y, (keyPressed) => this.onKeyUp(keyPressed));

        this.speedX = 0;
        this.speedY = 0;

        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        };
    }

    onKeyUp(keyPressed)
    {
        this.move(keyPressed);
    }

    move(keyPressed)
    {
        this.speedX = 0;
        this.speedY = 0;

        if (!keyPressed) return;

        let image = "left";
        if (keyPressed === "ArrowLeft") {
            if (!this.isColliding(this.x - 1, this.y))
            this.speedX = -1;
        }
        if (keyPressed === "ArrowRight") {
            image = "right";

            if (!this.isColliding(this.x + 1, this.y))
                this.speedX = 1; 
        }
        if (keyPressed === "ArrowUp") { 
            image = "back";

            if (!this.isColliding(this.x, this.y - 1))
                this.speedY = -1;
        }
        if (keyPressed === "ArrowDown") { 
            image = "front";

            if (!this.isColliding(this.x, this.y + 1))
                this.speedY = 1;
        }

        const source = "resources/character/" + image + ".png";
        if (!this.image.src.includes(source))
            this.image.src = source;

        this.newPos();
    }
}