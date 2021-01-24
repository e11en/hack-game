function move()
{
    character.speedX = 0;
    character.speedY = 0;

    if (!gameArea.keys) return;

    let image = "left";
    if (gameArea.keys["ArrowLeft"]) {
        if (!characterHasCollision(character.x - 1, character.y))
            character.speedX = -1;
    }
    if (gameArea.keys["ArrowRight"]) {
        image = "right";

        if (!characterHasCollision(character.x + 1, character.y))
            character.speedX = 1; 
    }
    if (gameArea.keys["ArrowUp"]) { 
        image = "back";

        if (!characterHasCollision(character.x, character.y - 1))
            character.speedY = -1;
    }
    if (gameArea.keys["ArrowDown"]) { 
        image = "front";

        if (!characterHasCollision(character.x, character.y + 1))
            character.speedY = 1;
    }

    const source = "resources/character/" + image + ".png";
    if (!character.image.src.includes(source))
        character.image.src = source;

    character.newPos();
}

function characterHasCollision(x, y)
{
    let hit = false;
    objects.slice(1, objects.length).forEach(obj => {
        if (x < obj.x + obj.width  && x + character.width  > obj.x &&
            y < obj.y + obj.height && y + character.height > obj.y) {
                hit = true;
                return;
        }
    });

    return hit;
}