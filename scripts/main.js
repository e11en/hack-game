var objects, character, level;
const CANVASHEIGHT = 600;
const CANVASWIDTH = 800;

function startGame() {
    level = new Level1(CANVASHEIGHT, CANVASWIDTH);

    objects = [
        new Character(95, 64, Direction.DOWN), 
        ...level.getObjects()
    ];
    gameArea.start();
}

var gameArea = {
    informationBox : new InformationBox(),
    canvas : document.getElementById("game-area"),
    characterIsInteracting : false,
    score : new Score(),
    start : function() {
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASHEIGHT;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            if (e.key === "s")
                gameArea.score.save();

            objects.forEach(obj => {
                obj.keyDown(e.key);
            });
        });
        window.addEventListener('keyup', function (e) {
            objects.forEach(obj => {
                obj.keyUp(e.key);
            });
        });
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