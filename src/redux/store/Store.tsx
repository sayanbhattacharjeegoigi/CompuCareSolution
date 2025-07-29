// store.ts
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import serviceRequestReducer from "../slice/serviceRequestSlice"; // ✅ import it

let middleware = (getDefaultMiddleware: any) => getDefaultMiddleware();

if (__DEV__) {
  const { default: logger } = require("redux-logger");
  middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(logger);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceRequest: serviceRequestReducer, // ✅ add the reducer here
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
