import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Pokemon Awesome" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pokemon Awesome" />
        <meta name="description" content="Pokemon Awesome App" />
        <meta name="theme-color" content="#ffffff" key="meta:theme-color" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="apple-touch-icon" href="/favicons/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />

        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.toggle('dark', localStorage.theme === 'dark');
            `,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
