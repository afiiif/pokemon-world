import { QueryClient } from 'react-query';

const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: 1,
        networkMode: 'offlineFirst',
      },
    },
  });

export default getQueryClient;
