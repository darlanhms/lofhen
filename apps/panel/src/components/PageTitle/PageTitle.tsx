import { Helmet } from 'react-helmet';
import { Center, Flex, Text } from '@chakra-ui/react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<React.PropsWithChildren<PageTitleProps>> = ({ children, title }) => {
  return (
    <Center justifyContent="space-between" px={10} py={3}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      {children}
    </Center>
  );
};

export default PageTitle;
