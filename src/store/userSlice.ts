import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userRequest from 'services/Request/userRequest';
import { RootState } from './store';
import { UsersState } from './types';
import { IUser } from 'types/Interfaces';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('user/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: '',
};

export const getUsers = createAsyncThunk<IUser[], undefined, { state: RootState }>(
  'user/getUsers',
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
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'succeeded';
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      });
  },
});

export const {} = usersSlice.actions;

export const selectUsers = (state: RootState): UsersState => state.users;

export default usersSlice.reducer;
