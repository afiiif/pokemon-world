import '@/styles/globals.css';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import DefaultSeo from '@/components/headless/seo/default-seo';
import Layout from '@/components/layouts/layout';
import getQueryClient from '@/config/react-query';
import MyPokemonsProvider from '@/features/my-pokemons/components/my-pokemons-provider';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo />
        <Layout>
          <MyPokemonsProvider>
            <Component {...pageProps} />
          </MyPokemonsProvider>
        </Layout>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
