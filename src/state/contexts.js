import { createContext } from "react";
import { ObjectType } from "../helpers/constants";

export const IntialMapObjectsContext = [
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
];
export const MapObjectsContext = createContext(IntialMapObjectsContext);