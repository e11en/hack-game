class Wall extends BaseComponent
{
    constructor(x, y) {
        super(32, 64, "resources/level/wall.png", x, y);
    }
}

class Console extends BaseComponent
{
    constructor(x, y) {
        super(32, 32, "resources/level/console.png", x, y);
        this.hasInteraction = true;
    }
}