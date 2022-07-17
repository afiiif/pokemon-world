const withPWA = require('next-pwa');
const runtimeCaching = require('./next-pwa.cache');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        },
      ],
    },
  },
};

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
});
