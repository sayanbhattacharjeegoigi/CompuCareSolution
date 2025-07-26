// store.ts
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

let middleware = (getDefaultMiddleware: any) => getDefaultMiddleware();

if (__DEV__) {
  // only import and use redux-logger in development
  const { default: logger } = require("redux-logger");
  middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(logger);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
