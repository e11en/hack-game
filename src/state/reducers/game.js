import { GameActionTypes } from '../actions';

const initialState = {
    gameOver: false,
    language: "EN"
};

export const gameReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case GameActionTypes.GAME_OVER: {
        return {
          ...state,
          gameOver: action.payload
        };
      }
      case GameActionTypes.SET_LANGUAGE: {
        return {
          ...state,
          language: action.payload
        };
      }
      default:
        return state;
    }
  };