import { Level1CharacterOptions } from 'data/levels/level1';
import { MovementSpeed } from 'helpers/constants';
import { CharacterActionTypes } from '../actions';

const initialState = {
    health: 100,
    x: 0,
    y: 0,
    speed: MovementSpeed,
    isColliding: false,
    collidingWith: null,
    collidingDirection: null,
    characterImage: null,
    ...Level1CharacterOptions
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
      case CharacterActionTypes.SET_POSITION: {
        return {
          ...state,
          x: action.payload.x,
          y: action.payload.y
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
      case CharacterActionTypes.GET_HEALTH: {
        if(state.health + action.payload > 100) {
          return {
            ...state,
            health: 100
          };
        }

        return {
          ...state,
          health: state.health + action.payload
        };
      }
      case CharacterActionTypes.RESET_HEALTH: {
        return {
          ...state,
          health: 100
        };
      }
      case CharacterActionTypes.SET_CHARACTER_IMAGE: {
        return {
          ...state,
          characterImage: action.payload
        };
      }
      default:
        return state;
    }
  };