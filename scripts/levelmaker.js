var objects, level;
const CANVASHEIGHT = 600;
const CANVASWIDTH = 800;

function startMaker() {
    level = new Level(CANVASHEIGHT, CANVASWIDTH);

    objects = [];

    gameArea.start();
}

var gameArea = {
    canvas : document.getElementById("game-area"),
    selectedObject : null,
    mouseX : 0,
    mouseY : 0,
    start : function() {
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASHEIGHT;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.addEventListener('mousemove', onMouseMove);
        this.canvas.onclick = onMouseClick;
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

    if (gameArea.selectedObject != null)
        gameArea.selectedObject.update();
}

function onMouseClick(e) {
    if (gameArea.selectedObject == null) return;
    
    console.log(gameArea.selectedObject);

    objects.push(gameArea.selectedObject);
}

function onMouseMove(e) {
    document.getElementById("xANDy").innerText = e.clientX + "," + e.clientY;

    gameArea.mouseX = e.clientX;
    gameArea.mouseY = e.clientY;

    if (gameArea.selectedObject) {
        gameArea.selectedObject.x = gameArea.mouseX;
        gameArea.selectedObject.y = gameArea.mouseY;
    }
}

function selectObject(objectType) {
    var component = null;

    switch (objectType) {
        case "wall":
            component = new Wall(gameArea.mouseX, gameArea.mousey);
            break;
        case "console":
            component = new Console("", gameArea.mouseX, gameArea.mouseY, "", () => {});
            break;
    }

    gameArea.selectedObject = component;
}

function remove(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}