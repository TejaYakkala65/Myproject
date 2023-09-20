import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import UserReducer from "./reducer/UserReducer";

const appReducer = combineReducers({
    userDetails: UserReducer,
})

const persistConfig = {
    key: 'userInfo',
    storage
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);