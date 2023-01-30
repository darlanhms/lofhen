import { useState } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { AuthProvider } from './hooks/useAuth';
import { DrawerProvider } from './hooks/useDrawer';
import { Router } from './router/Router';
import theme from './styles/theme';
import { trpc } from './utils/trpc';

const App: React.FC = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3333/trpc',
          // optional
          headers() {
            return {
              authorization: localStorage.getItem('accessToken') || '',
            };
          },
        }),
      ],
    }),
  );

  return (
    <ChakraProvider theme={theme}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <DrawerProvider>
              <Router />
            </DrawerProvider>
          </AuthProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ChakraProvider>
  );
};

export default App;
