// GAME
export const GameActionTypes = {
    GAME_OVER: "GAME_OVER",
    SET_LANGUAGE: "SET_LANGUAGE"
}

export const GameOver = (isGameOver) => (dispatch) => dispatch({type: GameActionTypes.GAME_OVER, payload: isGameOver});
export const SetLanguage = (language) => (dispatch) => dispatch({type: GameActionTypes.SET_LANGUAGE, payload: language});

// UI
export const UiActionTypes = {
    SET_CONSOLE_VISIBILITY: "SET_CONSOLE_VISIBILITY"
}

export const SetConsoleVisibility = (visible) => (dispatch) => dispatch({type: UiActionTypes.SET_CONSOLE_VISIBILITY, payload: visible});
