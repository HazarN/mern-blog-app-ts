import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element | null {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, [isAuth, navigate]);

  return isAuth ? <>{children}</> : null;
}

export default ProtectedRoute;
