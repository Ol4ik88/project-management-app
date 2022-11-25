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
import { authLocalstorage } from 'services/LocalStorage/authLocalStorage';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('auth/') && action.type.endsWith('/pending');
}
export const signOut = createAction('signOut');

const initialState: UserState[] = [
  {
    _id: undefined,
    login: undefined,
    name: undefined,
    token: undefined,
    exp: 0,
  },
];

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
      console.log('action.payload', action.payload);

      state = action.payload;
    });
  },
});

export const {} = usersSlice.actions;

export const selectUsers = (state: RootState): UserState[] => state.users;

export default usersSlice.reducer;

//export const { getUsers } = usersSlice.actions;
