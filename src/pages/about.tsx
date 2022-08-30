import { NextSeo } from 'next-seo';

import DefaultOgImage from '@/components/headless/seo/default-og-image';

export default function AboutPage() {
  return (
    <>
      <NextSeo title="About" />
      <DefaultOgImage />

      <h1 className="h1 pb-7">About Pokémon Awesome</h1>

      <div className="max-w-2xl space-y-5 pb-6">
        <p>
          Pokémon Awesome is a simple yet rich-featured Pokémon website that is built in order to
          allow Pokémon lovers to easily explore Pokémon and do many more things. Anyone can use
          this site to search for Pokémon by name and filter them by generation and type.
        </p>
        <p>
          On the Pokémon detail page, you can see information about the Pokémon&apos;s description,
          habitat, forms, evolution chain, base stats, moves, and abilities. You can also catch the
          Pokémon with a 50% success rate. Enjoy the cool flying pokeball animation. ✨😁
        </p>
        <p>
          Also, you can <b className="font-semibold">compare up to 10 Pokémon</b>! Is that awesome?
          <br />
          Make yourself a data-driven person when creating a team in the Pokémon games.
        </p>
        <p>
          Ah, you like data visualization?
          <br />
          Come and see the Pokémon type relation visualization.
        </p>
        <p>
          Awesome isn&apos;t it?
          <br />
          Tell all your Pokemon-lovers friends around the world about this site!
        </p>
      </div>

      <a
        href="https://www.producthunt.com/posts/pokemon-awesome?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-pokemon&#0045;awesome"
        target="_blank"
        rel="noreferrer"
        title="Pokemon Awesome on Product Hunt"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=357768&theme=light"
          alt="Pokemon&#0032;Awesome - The&#0032;coolest&#0032;Pokemon&#0032;website&#0032;ever&#0033; | Product Hunt"
          className="inline-block"
          width="250"
          height="54"
        />
      </a>

      <h2 className="pt-11 pb-5 text-2xl font-bold">Notes</h2>
      <div className="max-w-2xl space-y-5">
        <p>
          All Pokemon data used in this project comes from{' '}
          <a className="text-elm-water hover:underline" href="https://pokeapi.co/docs/graphql">
            PokeAPI GraphQL Beta
          </a>
          .
          <br />
          Playground:{' '}
          <a
            className="text-elm-water hover:underline"
            href="https://beta.pokeapi.co/graphql/console/"
          >
            https://beta.pokeapi.co/graphql/console/
          </a>
        </p>
        <p>
          All Pokemon images (artwork) comes from{' '}
          <a className="text-elm-water hover:underline" href="https://github.com/PokeAPI/sprites">
            https://github.com/PokeAPI/sprites
          </a>
          .
        </p>
      </div>
    </>
  );
}
