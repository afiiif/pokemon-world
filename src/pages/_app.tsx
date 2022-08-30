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
          openGraph={{
            images: [
              {
                url: `${
                  process.env.NEXT_PUBLIC_BASE_URL || ''
                }/images/pokemon-awesome-thumbnail-1200x630.jpg`,
                width: 1200,
                height: 630,
                alt: 'Pokemon Awesome',
                type: 'image/jpeg',
              },
              {
                url: `${
                  process.env.NEXT_PUBLIC_BASE_URL || ''
                }/images/pokemon-awesome-thumbnail.jpg`,
                width: 2560,
                height: 1280,
                alt: 'Pokemon Awesome',
                type: 'image/jpeg',
              },
            ],
          }}
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
