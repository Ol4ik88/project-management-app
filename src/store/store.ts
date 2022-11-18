import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './boardsSlice';
import authSlice from './authSlice';
import columnsSlice from './columnSlice';
import tasksSlice from './taskSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    boards: boardsSlice,
    columns: columnsSlice,
    tasks: tasksSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
