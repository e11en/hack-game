import { GameActionTypes } from '../actions';

const initialState = {
    gameOver: false
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
      default:
        return state;
    }
  };