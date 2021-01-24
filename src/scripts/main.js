var objects, character;

function startGame() {
    character = new component(28, 38, "resources/character/right.png", 10, 120, "image");
    var walls = [
        new component(10, 200, "green", 40, 120)
    ];

    objects = [character, ...walls];
    gameArea.start();
}
  
var gameArea = {
    canvas : document.getElementById("game-area"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.key] = true;
            move();
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.key] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function updateGameArea() {
    gameArea.clear();

    objects.forEach(obj => {
        obj.update();
    });
}