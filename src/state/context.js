import { createContext } from "react";

export const InitialLevelContext = {
    map: "",
    mapObjects: [],
    characterOptions: {}
};

export const LevelContext = createContext(InitialLevelContext);