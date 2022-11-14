import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AuthState } from './types';

const tmpToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBlZjg2NGFlMTZjNzJhNzNhYWIxNSIsImxvZ2luIjoidXNlciIsImlhdCI6MTY2ODQxNDI1NiwiZXhwIjoxNjY4NDU3NDU2fQ.w_2hoDSbNk6rhWHcRNlKYN_xLIYfGx_xaER7pdMrMHE';
const initialState: AuthState = { auth: { token: tmpToken }, status: 'idle', error: null };

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ login, password }: { login: string; password: string }, thunkAPI) => {
    // const response = await api.signin();
    // const response = await api.getUserById();
    return { _id: 'qwerty', name: 'IMask', login: 'IMask', token: '123456', exp: 12345678 };
  }
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { name, login, password }: { name: string; login: string; password: string },
    thunkAPI
  ) => {
    // const response = await api.signup();
    return { _id: 'qwerty', name: 'IMask', login: 'IMask' };
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async ({ userId }: { userId: string }, thunkAPI) => {
    // const response = await api.signup();
    return { _id: 'qwerty', name: 'IMask', login: 'IMask' };
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.auth = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      })

      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.auth = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      });
  },
});

export const {} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
