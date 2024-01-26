'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserContextProvider } from './contexts/userContext';

function Providers({ children }: { children: React.ReactNode }) {
  const queryclient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryclient}>
        <UserContextProvider>{children}</UserContextProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default Providers;
