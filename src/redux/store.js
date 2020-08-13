import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import agentReducer from './AgentDucks'
import playerReducer from './PlayerDucks'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['agent','player']
}

const rootReducer = combineReducers({
  agent: agentReducer,
  player: playerReducer
})

const persistGlobalReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore( persistGlobalReducer, composeEnhancers( applyMiddleware(thunk) ) );


export const persistor = persistStore(store);

export default {store, persistor};