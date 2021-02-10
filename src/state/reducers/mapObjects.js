import { MapObjectActionTypes } from '../actions';

const initialState = [];

export const mapObjectsReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case MapObjectActionTypes.REPLACE_OBJECTS: {
        return {
          ...action.payload
        };
      }
      case MapObjectActionTypes.DISABLE_OBJECT: {
        const itemKey = Object.keys(state).filter(o => o === action.payload);
        if (!itemKey) return state;

        const item = state[itemKey];
        if (!item) return state;
        
        item.enabled = false;

        return {
          ...state,
          ...item
        };
      }
      default:
        return state;
    }
  };