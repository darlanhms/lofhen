import React from 'react';
import { Box, BoxProps, Card, Stack, StackDivider } from '@chakra-ui/react';
import useIsMobile from '../../hooks/useIsMobile';

const ListContainer: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...rest }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box borderTop="1px" borderBottom="1px" borderColor="gray.200" {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <Card mx={3} {...rest}>
      {children}
    </Card>
  );
};

export default ListContainer;
