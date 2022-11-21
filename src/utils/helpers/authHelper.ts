import { useDispatch, useSelector } from 'react-redux';
import { authLocalstorage } from 'services/LocalStorage/authLocalStorage';
import { selectAuth, setAuth, signOut } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { JwtPayload } from 'store/types';
import jwt_decode from 'jwt-decode';

export function useAuthStatus() {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);

  function isAuth() {
    if (!auth.token) {
      const token = authLocalstorage.getAuth() ?? '';
      if (token) {
        const { id, exp, login } = jwt_decode<JwtPayload>(token);
        dispatch(setAuth({ token, login, _id: id, exp }));
      }
    }
    const currentDate = new Date().getTime() / 1000;
    const authStatus = auth.exp ? currentDate < auth.exp : false;

    if (auth.exp && !authStatus) {
      dispatch(signOut());
    }
    return authStatus;
  }

  return { isAuth };
}
