import { QueryClient, QueryCache } from 'react-query';

export const cache = new QueryCache();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
  queryCache: cache,
});
