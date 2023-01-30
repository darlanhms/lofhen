import { HiUser, HiMenu } from 'react-icons/hi';
import { Box, IconButton, Text, useMediaQuery } from '@chakra-ui/react';
import useDrawer from '../../hooks/useDrawer';

const Header: React.FC = () => {
  const [isMobileScreen] = useMediaQuery('(max-width: 768px)');
  const { open } = useDrawer();

  return (
    <Box display="flex" padding={3}>
      {isMobileScreen && (
        <IconButton
          onClick={open}
          fontSize="xl"
          variant="ghost"
          colorScheme="gray"
          aria-label="menu"
          icon={<HiMenu />}
        />
      )}
      <Box flex={1} />
      <IconButton
        variant="ghost"
        fontSize="xl"
        aria-label="Conta"
        icon={<HiUser />}
        colorScheme="gray"
        borderRadius="50%"
      />
    </Box>
  );
};

export default Header;
