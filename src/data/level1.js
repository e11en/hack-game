import { Direction, ObjectType } from "helpers/constants";

export const Level1lMapContext = {
    image: "level1.png"
};

export const Level1CharacterOptionsContext = {
    x: 300,
    y: 150
};

export const Level1MapObjectsContext = [
    {
        id: "door-440-27",
        type: ObjectType.DOOR,
        x: 440,
        y: 27,
        enabled: true,
        width: 32,
        height: 32,
        hitBox: {
            width: 64,
            height: 10
        },
        hasInteraction: true
    },
    {
        type: ObjectType.WALL,
        x: 0,
        y: 0,
        enabled: true,
        width: 480,
        height: 32
    },
    {
        type: ObjectType.WALL,
        x: 215,
        y: 32,
        enabled: true,
        width: 50,
        height: 80
    },
    {
        type: ObjectType.WALL,
        x: 369,
        y: 32,
        enabled: true,
        width: 50,
        height: 80
    },
    {
        id: "console-96-96",
        type: ObjectType.CONSOLE,
        x: 96,
        y: 96,
        enabled: true,
        width: 64,
        height: 49,
        hitBox: {
            width: 64,
            height: 26
        },
        hasInteraction: true
    },
    {
        id: "laser-269-95",
        type: ObjectType.LASER,
        x: 269,
        y: 95,
        enabled: true,
        width: 96,
        height: 20,
        hasInteraction: true,
        hasDamage: true,
        damage: 10,
        hitBox: {
            width: 96,
            height: 15
        }
    },
    {
        id: "flag-310-60",
        type: ObjectType.FLAG,
        x: 310,
        y: 60,
        text: "THIS_IS_A_TEST",
        enabled: true,
        width: 25,
        height: 28,
        hasInteraction: true,
        hitBox: {
            width: 25,
            height: 10
        }
    },
    {
        id: "character-400-200",
        type: ObjectType.CHARACTER,
        imageSrc: "resources/characters/female-1.png",
        x: 400,
        y: 200,
        text: ["Hi!","Can you open the door?","It needs some sort of token.."],
        enabled: true,
        width: 32,
        height: 32,
        hasInteraction: true,
        direction: Direction.LEFT
    },
];