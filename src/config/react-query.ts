import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

export default queryClient;
