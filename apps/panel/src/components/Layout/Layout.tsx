import { Outlet } from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>DashBoard</h1>

      <Outlet />
    </>
  );
};

export default Layout;
