import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';

const RequireAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isFetching } = useAuth();
  const navigate = useNavigate();

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!user) {
    navigate('/login');
    return <></>;
  }

  return <>{children}</>;
};

export default RequireAuth;
