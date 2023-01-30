import { Box, BoxProps } from '@chakra-ui/react';

interface CenterProps extends BoxProps {
  vertical?: boolean;
  horizontal?: boolean;
}

const Center: React.FC<CenterProps> = ({ vertical = true, horizontal = true, children, ...rest }) => {
  return (
    <Box
      {...(vertical && {
        justifyContent: 'center',
      })}
      {...(horizontal && {
        alignItems: 'center',
      })}
      {...rest}
    >
      {children}
    </Box>
  );
};
