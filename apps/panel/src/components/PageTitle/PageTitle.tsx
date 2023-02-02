import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { Center, IconButton, Text } from '@chakra-ui/react';

interface PageTitleProps {
  title: string;
  backButton?: boolean;
}

const PageTitle: React.FC<React.PropsWithChildren<PageTitleProps>> = ({ children, backButton, title }) => {
  const navigate = useNavigate();

  return (
    <Center justifyContent="space-between" px={4} py={3}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Center>
        {backButton && (
          <IconButton
            aria-label="Voltar"
            variant="ghost"
            icon={<HiArrowLeft />}
            onClick={() => navigate(-1)}
            mr={2}
          />
        )}
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
      </Center>
      {children}
    </Center>
  );
};

export default PageTitle;
