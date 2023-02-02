import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';

const EntryRedirect: React.FC = () => {
  const { user, isFetching } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!user) {
    navigate('/login');
    return <></>;
  }

  navigate('/dashboard');
  return <></>;
};

export default EntryRedirect;
