import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { characterReducer } from './reducers/character';
import { gameReducer } from './reducers/game';
import { mapObjectsReducer } from './reducers/mapObjects';

const rootReducer = combineReducers({
  game: gameReducer,
  character: characterReducer,
  mapObjects: mapObjectsReducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['mapObjects']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, applyMiddleware(thunk));

export const persistor = persistStore(store);