import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './boardsSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    boards: boardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
