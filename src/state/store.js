import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { characterReducer } from './reducers/character';
import { gameReducer } from './reducers/game';

const rootReducer = combineReducers({
  game: gameReducer,
  character: characterReducer
});

export default createStore(rootReducer, undefined, applyMiddleware(thunk));