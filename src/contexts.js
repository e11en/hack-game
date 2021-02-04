import { createContext } from "react";
import { ObjectType } from "./constants";

export const IntialMapObjectsContext = [
    {
        type: ObjectType.CONSOLE,
        x: 96,
        y: 96,
        enabled: true,
        width: 64,
        height: 49,
        hitBox: {
            width: 64,
            height: 26
        }
    }
];
export const MapObjectsContext = createContext(IntialMapObjectsContext);