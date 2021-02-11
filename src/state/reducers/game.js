import { Level1Map } from 'data/levels/level1';
import { GameActionTypes } from '../actions';

const initialState = {
    gameOver: false,
    language: "EN",
    level: 1,
    map: {...Level1Map}
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
      case GameActionTypes.SET_MAP: {
        return {
          ...state,
          map: action.payload
        };
      }
      case GameActionTypes.SET_LEVEL: {
        return {
          ...state,
          level: action.payload
        };
      }
      default:
        return state;
    }
  };