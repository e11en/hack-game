export const CharacterActionTypes = {
    GO_LEFT: "GO_LEFT",
    GO_RIGHT: "GO_RIGHT",
    GO_UP: "GO_UP",
    GO_DOWN: "GO_DOWN",
}

export const GoLeft = () => (dispatch) => dispatch({type: CharacterActionTypes.GO_LEFT});
export const GoRight = () => (dispatch) => dispatch({type: CharacterActionTypes.GO_RIGHT});
export const GoUp = () => (dispatch) => dispatch({type: CharacterActionTypes.GO_UP});
export const GoDown = () => (dispatch) => dispatch({type: CharacterActionTypes.GO_DOWN});