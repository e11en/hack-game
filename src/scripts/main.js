var objects, character;

function startGame() {
    objects = [
        new Character(150, 120), 
        ...getBorderWalls(600, 800),
        ...getConsoles()
    ];
    gameArea.start();
}

function getBorderWalls(height, width)
{
    const walls = [];

    for(let i = 0; i * 32 < height; i++)
    {
        // Left wall
        walls.push(new Wall(0, i * 32));

        // Right wall
        walls.push(new Wall(width - 32, i * 32));
    }

    
    for(let i = 0; i * 32 < width; i++)
    {
        // Top wall
        walls.push(new Wall(i * 32, 0));

        // Bottom wall
        walls.push(new Wall(i * 32, height - 32));
    }

    return walls;
}

function getConsoles()
{
    return [
        new Console(80,120)
    ];
}
  
var gameArea = {
    canvas : document.getElementById("game-area"),
    characterIsInteracting : false,
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            objects.forEach(obj => {
                obj.keyDown(e.key);
            });
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

function showInformationBox(text)
{
    var box = document.getElementById("information");
    box.textContent = text;
    box.className = "";
}

function hideInformationBox()
{
    document.getElementById("information").className = "hidden";
}