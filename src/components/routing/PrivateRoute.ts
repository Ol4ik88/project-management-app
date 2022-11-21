import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { useAuthStatus } from 'utils/helpers/authHelper';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { isAuth } = useAuthStatus();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
    }
  }, []);
  return children;
}

export default PrivateRoute;
