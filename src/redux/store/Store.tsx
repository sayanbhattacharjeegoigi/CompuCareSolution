import { configureStore } from '@reduxjs/toolkit';
import addAdressSlice from '../feature/addAdressSlice';

const store = configureStore({
  reducer: {
    address: addAdressSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;