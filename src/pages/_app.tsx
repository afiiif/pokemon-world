import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import Layout from '@/components/layouts/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
