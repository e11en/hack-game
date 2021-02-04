import { createContext } from "react";
import { ObjectType } from "./constants";

export const IntialMapObjectsContext = [
    {
        type: ObjectType.CONSOLE,
        x: 96,
        y: 96
    }
];
export const MapObjectsContext = createContext(IntialMapObjectsContext);