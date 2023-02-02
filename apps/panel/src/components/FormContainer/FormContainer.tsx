import { CardProps, Card } from '@chakra-ui/react';

const FormContainer: React.FC<CardProps> = ({ children, ...rest }) => {
  return (
    <Card margin={4} padding={3} {...rest}>
      {children}
    </Card>
  );
};

export default FormContainer;
