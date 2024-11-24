import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import storage from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import userSlice from "./Slices/userSlice";
import brokerSlice from "./Slices/brokerSlice";

const rootReducer = combineReducers({ user: userSlice, broker: brokerSlice })

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);