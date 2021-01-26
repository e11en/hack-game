class Wall extends BaseComponent
{
    constructor(x, y) {
        super(32, 32, "resources/level/wall.png", x, y);
    }
}

class Console extends BaseComponent
{
    constructor(x, y) {
        super(32, 32, "resources/level/console.png", x, y,(keyPressed) => this.onKeyUp(keyPressed));
        this.hasInteraction = true;
    }

    onKeyUp(keyPressed)
    {
        if (keyPressed !== " ") return;

        gameArea.characterIsInteracting = !gameArea.characterIsInteracting;

        if (gameArea.characterIsInteracting)
        {
            this.image.src = "resources/level/console-active.png";
            showInformationBox("Exit with spacebar");
        }
        else
        {
            this.image.src = "resources/level/console.png";
            hideInformationBox();
        }
    }
}

class Laser extends BaseComponent
{
    constructor(x, y) {
        super(32, 16, "resources/level/laser.png", x, y);
        this.enabled = true;
    }

    update() {
        if (this.enabled)
            super.update();
    }
}