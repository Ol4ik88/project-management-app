import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from 'utils/helpers/authHelper';

function PrivateRoute({ children }: { children: JSX.Element }) {
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
