import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authRequest from 'services/Request/authRequest';
import { RootState } from './store';
import { AuthState, JwtPayload, SignUpProps, UserState } from './types';
import jwt_decode from 'jwt-decode';

const tmpToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBlZjg2NGFlMTZjNzJhNzNhYWIxNSIsImxvZ2luIjoidXNlciIsImlhdCI6MTY2ODc2OTgwMSwiZXhwIjoxNjY4ODEzMDAxfQ.ylDAYGOE3S0EGjlLnV1BCWCtbgZX68kgldYqDSRmC4E';
const tmpUserId = '6370ef864ae16c72a73aab15';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('/pending');
}

const initialState: AuthState = {
  auth: { token: tmpToken, _id: tmpUserId },
  status: 'idle',
  error: null,
};

export const signin = createAsyncThunk<UserState, Omit<SignUpProps, 'name'>, { state: RootState }>(
  'auth/signin',
  async ({ login, password }, thunkAPI) => {
    const token = await authRequest.userSignIn({ login, password });
    const { id, exp } = jwt_decode<JwtPayload>(token);

    // const response = await api.getUserById();
    return { _id: id, name: 'IMask', login, token, exp };
  }
);

export const signup = createAsyncThunk<
  Omit<UserState, 'token' | 'exp'>,
  SignUpProps,
  { state: RootState }
>('auth/signup', async ({ name, login, password }, thunkAPI) => {
  const response = await authRequest.userSignUp({ login, password, name });
  return { name, login };
});

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
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auth = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auth = action.payload;
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

export const {} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
