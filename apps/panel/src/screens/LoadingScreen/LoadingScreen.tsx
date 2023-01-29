import { Box, CircularProgress } from '@chakra-ui/react';

const LoadingScreen: React.FC = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate color="orange.400" size="90px" thickness="6px" />
    </Box>
  );
};

export default LoadingScreen;
