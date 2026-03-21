import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import journalReducer from "../features/journal/journalSlice";
import storage from "./storage";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  journals:journalReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","journals"], // only persist auth
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: process.env.NODE_ENV !== "production",
});

export let persistor: any;

if (typeof window !== "undefined") {
  persistor = persistStore(store);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
