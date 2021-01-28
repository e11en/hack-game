var objects, character, level;
const CANVASHEIGHT = 600;
const CANVASWIDTH = 800;

function startGame() {
    level = new Level1(CANVASHEIGHT, CANVASWIDTH);
    character = new Character(94, 64, Direction.DOWN);

    objects = [
        character,
        ...level.getObjects()
    ];

    gameArea.score.save();
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
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', OnKeyUp);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', OnKeyUp);
        this.informationBox.show("GAME OVER!");
        clearInterval(this.interval);
    }
}

function onKeyDown(e) {
    if (e.key === "s")
        gameArea.score.save();

    character.onKeyDown(e.key);
}

function OnKeyUp(e) {
    character.onKeyUp();
}

function updateGameArea() {
    gameArea.clear();

    objects.forEach(obj => {
        obj.update();
    });
}