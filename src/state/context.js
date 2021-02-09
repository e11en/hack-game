import { createContext } from "react";

export const InitialMapContext = {
    image: ""
};

export const InitialCharacterOptionsContext = {
    x: 0,
    y: 0
};

export const InitialMapObjectsContext = [];

export const MapContext = createContext(InitialMapContext);
export const CharacterOptionsContext = createContext(InitialCharacterOptionsContext);
export const MapObjectsContext = createContext(InitialMapObjectsContext);