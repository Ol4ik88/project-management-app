import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const authUser = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, []);
  return children;
}

export default PrivateRoute;
