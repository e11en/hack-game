class BaseComponent {
    constructor(width, height, imagePath, x, y, keyDown) {
        this.image = new Image();
        this.image.src = imagePath;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.update = function () {
            var ctx = gameArea.context;
            ctx.drawImage(this.image,
                          this.x,
                          this.y,
                          this.width, 
                          this.height);
        };
        this.keyDown = keyDown !== undefined ? keyDown : () => {}
    }

    isColliding(x, y)
    {
        let hit = false;
        objects.filter(obj => obj != this).forEach(obj => {
            if (x < obj.x + obj.width  && x + this.width  > obj.x &&
                y < obj.y + obj.height && y + this.height > obj.y) {
                    hit = true;
                    return;
            }
        });

        return hit;
    }
}