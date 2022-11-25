import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './boardsSlice';
import authSlice from './authSlice';
import columnsSlice from './columnSlice';
import tasksSlice from './taskSlice';
import usersSlice from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    boards: boardsSlice,
    columns: columnsSlice,
    tasks: tasksSlice,
    users: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
