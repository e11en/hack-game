import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { characterReducer } from './reducers/character';

const rootReducer = combineReducers({
  character: characterReducer
});

export default createStore(rootReducer, undefined, applyMiddleware(thunk));