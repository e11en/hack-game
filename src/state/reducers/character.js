import { MovementSpeed } from 'helpers/constants';
import { CharacterActionTypes } from '../actions';

const initialState = {
    health: 100,
    x: 100,
    y: 200,
    speed: MovementSpeed,
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
          x: state.x + action.payload
        };
      }
      case CharacterActionTypes.GO_LEFT: {
        return {
          ...state,
          x: state.x - action.payload
        };
      }
      case CharacterActionTypes.GO_UP: {
        return {
          ...state,
          y: state.y - action.payload
        };
      }
      case CharacterActionTypes.GO_DOWN: {
        return {
          ...state,
          y: state.y + action.payload
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
      case CharacterActionTypes.GET_DAMAGE: {
        return {
          ...state,
          health: state.health - action.payload
        };
      }
      default:
        return state;
    }
  };