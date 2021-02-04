import { CharacterActionTypes } from '../actions';

const initialState = {
    x: 96,
    y: 155,
    speed: 1,
    isColliding: false,
    collidingWith: null,
    collidingDirection: null
};

export const characterReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case CharacterActionTypes.GO_RIGHT: {
        return {
          ...state,
          x: state.x + action.payload.speed
        };
      }
      case CharacterActionTypes.GO_LEFT: {
        return {
          ...state,
          x: state.x - action.payload.speed
        };
      }
      case CharacterActionTypes.GO_UP: {
        return {
          ...state,
          y: state.y - action.payload.speed
        };
      }
      case CharacterActionTypes.GO_DOWN: {
        return {
          ...state,
          y: state.y + action.payload.speed
        };
      }
      case CharacterActionTypes.SET_COLLIDING: {
        return {
          ...state,
          isColliding: action.payload.isColliding,
          collidingWith: action.payload.collidingWith,
          collidingDirection: action.payload.collidingDirection
        };
      }
      default:
        return state;
    }
  };