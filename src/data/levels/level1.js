import { Door, Wall, Console, Laser, Flag, Character, Apple } from "data/mapObjects";
import { Direction } from "helpers/constants";

export const Level1lMapContext = {
    image: "level1.png"
};

export const Level1CharacterOptionsContext = {
    x: 250,
    y: 200
};

export const Level1MapObjectsContext = [
    {
        ...Door,
        id: "door-440-27",
        x: 440,
        y: 27
    },
    {
        ...Wall,
        x: 0,
        y: 0,
        width: 480,
        height: 32
    },
    {
        ...Wall,
        x: 215,
        y: 32,
        width: 50,
        height: 80
    },
    {
        ...Wall,
        x: 369,
        y: 32,
        width: 50,
        height: 80
    },
    {
        ...Wall,
        x: 480,
        y: 30,
        width: 10,
        height: 320
    },
    {
        ...Wall,
        x: -10,
        y: 30,
        width: 10,
        height: 330
    },
    {
        ...Wall,
        x: 0,
        y: 345,
        width: 480,
        height: 10
    },
    {
        ...Console,
        id: "console-96-96",
        x: 96,
        y: 96,
    },
    {
        ...Laser,
        id: "laser-269-95",
        x: 269,
        y: 95,
    },
    {
        ...Flag,
        id: "flag-310-60",
        x: 310,
        y: 60,
        text: "THIS_IS_A_TEST"
    },
    {
        ...Character,
        id: "character-400-200",
        imageSrc: "resources/characters/female-1.png",
        x: 400,
        y: 200,
        text: {
            "EN": ["Hi!","Can you open the door?","It needs some sort of token..", "Maybe you should checkout the computer!"],
            "NL": ["Hi!","Krijg jij de deur open?","Blijkbaar heb je een token nodig..", "Misschien kan je de computer proberen!"],
        },
        direction: Direction.LEFT
    },
    {
        ...Apple,
        id: "item-200-300",
        x: 200,
        y: 300
    },
];