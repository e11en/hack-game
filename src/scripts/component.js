function component(width, height, color, x, y, type, init) {
    this.type = type;
    this.isMoving = false;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.direction = "right";
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
              this.x,
              this.y,
              this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.init = init
}