export const getCharacterState = store => store.character;
export const getCharacterX = state => state.character.x;
export const getCharacterY = state => state.character.y;
export const getCharacterHealth = state => state.character.health;
export const getCharacterCollidingWith = state => state.character.collidingWith;
export const getCharacterCollidingDirection = state => state.character.collidingDirection;
export const getCharacterIsColliding = state => state.character.isColliding;
export const getCharacterSpeed = state => state.character.speed;

export const getGameMapImage = state => state.game.map.image;
export const getGameLanguage = state => state.game.language;
export const getGameOver = state => state.game.gameOver;

export const getMapObjects = state => state.mapObjects;