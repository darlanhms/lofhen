import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@chakra-ui/react';
import useIsMobile from '../../hooks/useIsMobile';
import DrawerMenu from './DrawerMenu';
import FixedMenu from './FixedMenu';
import Header from './Header';

const Layout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <DrawerMenu /> : <FixedMenu />}
      <Box marginLeft={{ base: '0px', md: '320px' }}>
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
