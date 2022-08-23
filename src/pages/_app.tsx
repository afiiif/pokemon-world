import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from '@/components/layouts/layout';
import getQueryClient from '@/config/react-query';
import MyPokemonsProvider from '@/features/my-pokemons/components/my-pokemons-provider';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo
          defaultTitle="Pokémon Awesome"
          titleTemplate="%s | Pokémon Awesome"
          description={process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION || 'Pokémon Awesome'}
        />
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
