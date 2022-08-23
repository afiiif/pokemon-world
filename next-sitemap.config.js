const pokemons = require('./public/generated/pokemons-snake-case.json');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  additionalPaths: () =>
    pokemons.map((pokemonName) => ({
      loc: `/pokemon/${pokemonName}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })),
};
