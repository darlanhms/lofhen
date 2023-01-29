import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Login from '../screens/Login/Login';
import EntryRedirect from './EntryRedirect';
import PersistDashboard from './PersistDashboard';
import RequireAuth from './RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EntryRedirect />,
    children: [
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
        ],
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
