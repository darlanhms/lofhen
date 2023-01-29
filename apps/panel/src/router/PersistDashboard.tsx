import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';

const PersistDashboard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isFetching } = useAuth();
  const navigate = useNavigate();

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (user) {
    navigate('/dashboard');
    return <></>;
  }

  return <>{children}</>;
};

export default PersistDashboard;
