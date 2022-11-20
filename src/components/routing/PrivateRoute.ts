import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';
import { AppDispatch } from 'store/store';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/');
    }
  }, []);
  return children;
}

export default PrivateRoute;
