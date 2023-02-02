import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Login from '../screens/Login/Login';
import CreateUserScreen from '../screens/Users/Create';
import UsersScreen from '../screens/Users/Users';
import EntryRedirect from './EntryRedirect';
import PersistDashboard from './PersistDashboard';
import RequireAuth from './RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <EntryRedirect />,
      },
      {
        path: '/login',
        element: (
          <PersistDashboard>
            <Login />
          </PersistDashboard>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <Layout />
          </RequireAuth>
        ),
        children: [
          {
            index: true,
            element: <h1>Home</h1>,
          },
          {
            path: 'users',
            element: <UsersScreen />,
          },
          {
            path: 'users/create',
            element: <CreateUserScreen />,
          },
        ],
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
