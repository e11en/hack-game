import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { characterReducer } from './reducers/character';
import { gameReducer } from './reducers/game';
import { mapObjectsReducer } from './reducers/mapObjects';

const rootReducer = combineReducers({
  game: gameReducer,
  character: characterReducer,
  mapObjects: mapObjectsReducer
});

export default createStore(rootReducer, undefined, applyMiddleware(thunk));