import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { gameReducer } from './reducers/game';
import { uiReducer } from './reducers/ui';

const rootReducer = combineReducers({
  game: gameReducer,
  ui: uiReducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['mapObjects']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, applyMiddleware(thunk));

export const persistor = persistStore(store);