import { CharacterActionTypes } from '../actions';

const initialState = {
    x: 96,
    y: 100,
    speed: 1
};

export const characterReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case CharacterActionTypes.GO_RIGHT: {
        return {
          ...state,
          x: state.x + state.speed
        };
      }
      case CharacterActionTypes.GO_LEFT: {
        return {
          ...state,
          x: state.x - state.speed
        };
      }
      case CharacterActionTypes.GO_UP: {
        return {
          ...state,
          y: state.y - state.speed
        };
      }
      case CharacterActionTypes.GO_DOWN: {
        return {
          ...state,
          y: state.y + state.speed
        };
      }
      default:
        return state;
    }
  };