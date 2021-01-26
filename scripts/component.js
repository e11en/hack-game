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
        let hit = false;
        collingWith.filter(obj => obj.enabled).forEach(obj => {
            if (x < obj.x + obj.width  && x + this.width  > obj.x &&
                y < obj.y + obj.height && y + this.height > obj.y) {
                    hit = true;
                    return;
            }
        });

        return hit;
    }
}