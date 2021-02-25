import { UiActionTypes } from '../actions';

const initialState = {
    consoleVisible: false
};

export const uiReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case UiActionTypes.SET_CONSOLE_VISIBILITY: {
        return {
          ...state,
          consoleVisibility: action.payload
        };
      }
      default:
        return state;
    }
  };