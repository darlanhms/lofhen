import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Router } from './router/Router';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
};

export default App;
