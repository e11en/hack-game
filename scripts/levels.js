class Level
{
    constructor(canvasHeight, canvasWidth, isBordered, walls, consoles, lasers, infoBoards) {
        this.walls = walls;
        this.consoles = consoles;
        this.lasers = lasers;
        this.infoBoards = infoBoards;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.isBordered = isBordered;
    }

    getObjects()
    {
        let objects = [
            ...this.walls,
            ...this.consoles,
            ...this.lasers,
            ...this.infoBoards
        ];

        if (this.isBordered)
            return [
                ...this.getBorderWalls(this.canvasHeight, this.canvasWidth),
                ...objects
            ];
        else
            return objects;
    }

    getBorderWalls(height, width)
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
}

class Level1 extends Level
{
    constructor(canvasHeight, canvasWidth) {
        const walls = [
        ];

        for(let i = 0; i * 32 < 300; i++)
        {
            walls.push(new Wall(200, i * 32));
        }

        const lasers = [
            new Laser("laser-group-1", 32, 300),
            new Laser("laser-group-1", 64, 300),
            new Laser("laser-group-1", 96, 300),
            new Laser("laser-group-1", 128, 300),
            new Laser("laser-group-1", 160, 300),
            new Laser("laser-group-1", 168, 300)
        ];
        
        const consoles = [
            new Console(
                "console-1",
                100,
                200,
                "You did it! You found your first token console! Here you can enter the token you have found walking around the area or during a mission. " +
                "If the token is correct the console will turn off and something will happen. " +
                "In this case the lasers will be disabled and you can continue to the next console.",
                () => { Laser.disableGroup("laser-group-1") }
            )
        ];

        const infoBoards = [
            new InfoBoard(32, 27, "Nothing but cat posters here"),
            new InfoBoard(193, 200, "You've found a token! hitc_ctf{test_token_console-1}", true),
        ];

        super(canvasHeight, canvasWidth, true, walls, consoles, lasers, infoBoards);
    }
}