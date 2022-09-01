const pokemons = require('./public/generated/pokemons-snake-case.json');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  additionalPaths: () =>
    pokemons.map((pokemonName) => {
      const [mainName, variant = ''] = pokemonName.split('-');
      const hasVariant = variant.length > 1;
      const href = hasVariant ? `${mainName}/${pokemonName}` : pokemonName;

      return {
        loc: `/pokemon/${href}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }),
};
