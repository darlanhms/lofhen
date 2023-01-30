import { Outlet } from 'react-router-dom';
import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import DrawerMenu from './DrawerMenu';
import Header from './Header';
import { Sidebar } from './Sidebar';

const Layout: React.FC = () => {
  const [isMobileScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobileScreen ? (
        <DrawerMenu />
      ) : (
        <Box
          width="320px"
          overflow="auto"
          position="fixed"
          top={0}
          left={0}
          bottom={0}
          maxHeight="100vh"
          bg="white"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        >
          <Sidebar />
        </Box>
      )}
      <Box marginLeft={{ base: '0px', md: '320px' }}>
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
