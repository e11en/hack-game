export const GameActionTypes = {
    GAME_OVER: "GAME_OVER",
    SET_LANGUAGE: "SET_LANGUAGE",
}

export const GameOver = () => (dispatch) => dispatch({type: GameActionTypes.GAME_OVER});
export const SetLanguage = (language) => (dispatch) => dispatch({type: GameActionTypes.SET_LANGUAGE, payload: language});

export const CharacterActionTypes = {
    GO_LEFT: "GO_LEFT",
    GO_RIGHT: "GO_RIGHT",
    GO_UP: "GO_UP",
    GO_DOWN: "GO_DOWN",
    SET_COLLIDING: "SET_COLLIDING",
    GET_DAMAGE: "GET_DAMAGE",
    GET_HEALTH: "GET_HEALTH",
    SET_POSITION: "SET_POSITION"
};

export const SetPosition = (x, y) => (dispatch) => dispatch({type: CharacterActionTypes.SET_POSITION, payload: {x: x, y: y}});
export const GoLeft = (speed) => (dispatch) => dispatch({type: CharacterActionTypes.GO_LEFT, payload: speed});
export const GoRight = (speed) => (dispatch) => dispatch({type: CharacterActionTypes.GO_RIGHT, payload: speed});
export const GoUp = (speed) => (dispatch) => dispatch({type: CharacterActionTypes.GO_UP, payload: speed});
export const GoDown = (speed) => (dispatch) => dispatch({type: CharacterActionTypes.GO_DOWN, payload: speed});

export const SetColliding = (isColliding, collidingWith, collidingDirection) => 
(dispatch) => dispatch({type: CharacterActionTypes.SET_COLLIDING, payload: {isColliding, collidingWith, collidingDirection}});

export const GetDamage = (damage) => (dispatch) => dispatch({type: CharacterActionTypes.GET_DAMAGE, payload: damage});
export const GetHealth = (health) => (dispatch) => dispatch({type: CharacterActionTypes.GET_HEALTH, payload: health});