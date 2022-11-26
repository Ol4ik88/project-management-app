import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userRequest from 'services/Request/userRequest';
import { RootState } from './store';
import { UsersState } from './types';
import { IUser } from 'types/Interfaces';

const initialState: UsersState = {
  users: [],
};

export const getUsers = createAsyncThunk<IUser[], undefined, { state: RootState }>(
  'auth/getUsers',
  async (undefined, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    return await userRequest.getUsers(token);
  }
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const {} = usersSlice.actions;

export const selectUsers = (state: RootState): UsersState => state.users;

export default usersSlice.reducer;
