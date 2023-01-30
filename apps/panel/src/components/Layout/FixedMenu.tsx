import { Box } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';

const FixedMenu: React.FC = () => {
  return (
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
  );
};

export default FixedMenu;
