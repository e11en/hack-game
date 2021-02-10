import { GameActionTypes } from '../actions';

const initialState = {
    gameOver: false,
    language: "EN",
    map: ""
};

export const gameReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case GameActionTypes.GAME_OVER: {
        return {
          ...state,
          gameOver: true
        };
      }
      case GameActionTypes.SET_LANGUAGE: {
        return {
          ...state,
          language: action.payload
        };
      }
      case GameActionTypes.SET_MAP: {
        return {
          ...state,
          map: action.payload
        };
      }
      default:
        return state;
    }
  };