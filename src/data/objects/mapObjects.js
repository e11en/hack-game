import { ObjectType } from "helpers/constants";

export const Door = {
    type: ObjectType.DOOR,
    width: 32,
    height: 32,
    hasInteraction: true,
    enabled: true,
    hitBox: {
        width: 64,
        height: 10
    }
};

export const Wall = {
    type: ObjectType.WALL,
    enabled: true
};

export const Console = {
    type: ObjectType.CONSOLE,
    enabled: true,
    hasInteraction: true,
    width: 64,
    height: 49,
    hitBox: {
        width: 64,
        height: 26
    }
};

export const Laser = {
    type: ObjectType.LASER,
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
};

export const Flag = {
    type: ObjectType.FLAG,
    enabled: true,
    width: 25,
    height: 28,
    hasInteraction: true,
    hitBox: {
        width: 25,
        height: 10
    }
};

export const Character = {
    type: ObjectType.CHARACTER,
    enabled: true,
    width: 32,
    height: 32,
    hasInteraction: true
};