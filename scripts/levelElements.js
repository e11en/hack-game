class LevelElement extends BaseComponent
{
    constructor(id, width, height, imagePath, x, y, keyDown, keyUp)
    {
        super(width, height, imagePath, x, y, keyDown, keyUp);
        this.id = id;
    }
}

class Wall extends LevelElement
{
    constructor(x, y) {
        super(null, 32, 32, "resources/level/wall.png", x, y);
    }
}

class Console extends LevelElement
{
    constructor(id, x, y, tokenText, onSucces) {
        super(id, 32, 32, "resources/level/console.png", x, y,(keyPressed) => this.onKeyUp(keyPressed));
        this.hasInteraction = true;
        this.tokenText = tokenText;
        this.onSucces = onSucces !== undefined ? onSucces : () => {};
        this.isCompleted = false;
        this.isActive = false;
        this.tokenBox = new TokenBox(this.id, this.tokenText, () => this.onCompletion(), () => this.OnClose());
    }

    onKeyUp(keyPressed)
    {
        if (keyPressed !== " " || this.isCompleted || this.isActive) return;

        gameArea.characterIsInteracting = !gameArea.characterIsInteracting;

        if (!gameArea.characterIsInteracting)
        {
            this.image.src = "resources/level/console.png";
            this.tokenBox.hide();
            return;
        }

        this.isActive = true;
        this.image.src = "resources/level/console-active.png";
        this.tokenBox.show();
    }

    OnClose()
    {
        this.isActive = false;
        this.image.src = "resources/level/console.png";
        gameArea.characterIsInteracting = false;
        this.tokenBox.hide();
    }

    onCompletion()
    {
        this.isCompleted = true;
        this.isActive = false;
        this.image.src = "resources/level/console-completed.png";
        gameArea.characterIsInteracting = false;

        this.onSucces();
    }
}

class Laser extends LevelElement
{
    constructor(groupID, x, y) {
        super(groupID, 32, 16, "resources/level/laser.png", x, y);
    }

    update() {
        if (this.enabled)
            super.update();
    }

    static disableGroup(groupId)
    {
        objects.filter(obj => obj.id === groupId).forEach(laser => {
            laser.enabled = false;
        });
    }
}