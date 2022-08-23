import { NextSeo } from 'next-seo';

import { MAX_POKEMON_TO_COMPARE } from '../constants';

const thumbnail = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/compare-pokemons-thumbnail.jpg`;

export default function PokemonComparisonSeo() {
  return (
    <NextSeo
      title="Compare Pokémons"
      description={`Compare pokemon easily! Select up to ${MAX_POKEMON_TO_COMPARE} pokemons to compare. Tell your friend that your pokemon is better.`}
      openGraph={{
        images: [
          {
            url: thumbnail,
            width: 2560,
            height: 1280,
            alt: 'Pokemon Awesome',
            type: 'image/jpeg',
          },
        ],
      }}
    />
  );
}
