import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from './postSlice.js';
import socketSlice from "./socketSlice.js";
import chatSlice from "./chatSlice.js";
import rtnSlice from "./rtnSlice.js";
import adminSlice from "./adminSlice.js";

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['socketio'], // Prevent `socketio` state from persisting
};

const rootReducer = combineReducers({
    auth: authSlice,
    post: postSlice,
    socketio: socketSlice,
    chat: chatSlice,
    realTimeNotification: rtnSlice,
    adminAuth: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['socketio.socket'], // Ensure socket-specific paths are ignored
            },
        }),
});

export const persistor = persistStore(store); // Export persistor for PersistGate
export default store;
