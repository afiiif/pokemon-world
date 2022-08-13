import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from '@/components/layouts/layout';
import queryClient from '@/config/react-query';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo
          defaultTitle="Pokemon Awesome"
          titleTemplate="%s | Pokemon Awesome"
          description="Pokemon Awesome"
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
