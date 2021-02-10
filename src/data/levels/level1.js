import { Door, Wall, Console, Laser, Flag, Character, Apple } from "data/mapObjectsDefaults";
import { Direction } from "helpers/constants";
import { DisableObject } from "state/actions";

export const Level1Map = {
    image: "level1.png"
};

export const Level1CharacterOptions = {
    x: 250,
    y: 200
};

export const Level1MapObjects = {
    "door-440-27": {
        ...Door,
        id: "door-440-27",
        x: 440,
        y: 27
    },
    "wall-0-0": {
        ...Wall,
        x: 0,
        y: 0,
        width: 480,
        height: 32
    },
    "wall-215-32": {
        ...Wall,
        x: 215,
        y: 32,
        width: 50,
        height: 80
    },
    "wall-369-32": {
        ...Wall,
        x: 369,
        y: 32,
        width: 50,
        height: 80
    },
    "wall-480-30": {
        ...Wall,
        x: 480,
        y: 30,
        width: 10,
        height: 320
    },
    "wall-10-30": {
        ...Wall,
        x: -10,
        y: 30,
        width: 10,
        height: 330
    },
    "wall-0-345": {
        ...Wall,
        x: 0,
        y: 345,
        width: 480,
        height: 10
    },
    "console-96-96": {
        ...Console,
        id: "console-96-96",
        x: 96,
        y: 96,
        mission: {
            startText: {
                "EN": 
                [
                    "Crack the following code:",
                    "",
                    "V'ir ybpxrq gur qbbe naq uvqqra gur xrl haqre gur synt. Gur cnffjbeq gb qvfnoyr gur ynfre vf: pnrfne-pvcure",
                    "",
                    "Enter password to disable the laser:"
                ],
                "NL": 
                [
                    "Kraak de volgende code:",
                    "",
                    "Vx uro qr qrhe bcfybg trqnna ra qr fyrhgry baqre qr iynt irefgbcg. Urg jnpugjbbeq bz qr ynfre hvg gr fpunxryra vf: pnrfne-pvcure",
                    "",
                    "Voer het wachtwoord in om de laser uit te schakelen:"
                ]
            },
            answer: "caesar-cipher",
            actionText: {
                "EN": 
                [
                    "Disabling the laser.."
                ],
                "NL": 
                [
                    "Laser uitschakelen.."
                ]
            },
            action: (dispatch) => {
                setTimeout(() => {
                    dispatch(DisableObject("laser-269-95"));
                }, 1000);
            },
            finishText: {
                "EN": 
                [
                    "Laser is disabled.",
                ],
                "NL": 
                [
                    "Laser is uitgeschakeld.",
                ]
            }
        }
    },
    "laser-269-95": {
        ...Laser,
        id: "laser-269-95",
        x: 269,
        y: 95,
    },
    "flag-310-60": {
        ...Flag,
        id: "flag-310-60",
        x: 310,
        y: 60,
        text: "CAESAR_CIPHER_IS_NOT_SECURE"
    },
    "character-400-200": {
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
    "item-200-300": {
        ...Apple,
        id: "item-200-300",
        x: 200,
        y: 300
    },
};