import {
  AnyAction,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import authRequest from 'services/Request/authRequest';
import userRequest from 'services/Request/userRequest';
import { RootState } from './store';
import { AuthState, JwtPayload, SignUpProps, UserState, UpdateUserProps } from './types';
import jwt_decode from 'jwt-decode';
import { IUser } from 'types/Interfaces';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('/pending');
}
export const signOut = createAction('signOut');

const initialState: AuthState = {
  auth: {},
  status: 'idle',
  error: null,
};

export const signin = createAsyncThunk<UserState, Omit<SignUpProps, 'name'>, { state: RootState }>(
  'auth/signin',
  async ({ login, password }, thunkAPI) => {
    const token = await authRequest.userSignIn({ login, password });
    const { id, exp } = jwt_decode<JwtPayload>(token);
    const user = await authRequest.getUserById(id, token);

    return { _id: id, name: user.name, login, token, exp };
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

export const fetchUserById = createAsyncThunk<IUser, { userId: string }, { state: RootState }>(
  'auth/fetchUserById',
  async ({ userId }: { userId: string }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await authRequest.getUserById(userId, token);
    return response;
  }
);

export const updateUser = createAsyncThunk<IUser, UpdateUserProps, { state: RootState }>(
  'auth/updateUser',
  async ({ userId, name, login, password }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await userRequest.updateUser(userId, { name, login, password }, token);
    return response;
  }
);

export const removeUser = createAsyncThunk<IUser, { userId: string }, { state: RootState }>(
  'auth/removeUser',
  async ({ userId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await userRequest.deleteUser(userId, token);
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state, action: PayloadAction<string>) {
      state.status = action.payload;
      state.error = null;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
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
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auth.login = action.payload.login;
        state.auth.name = action.payload.name;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(signOut.type, (state, action) => {
        authSlice.caseReducers.resetAuth(state);
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

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;

export const { resetState } = authSlice.actions;
