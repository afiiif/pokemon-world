import { NextSeo } from 'next-seo';

import { formatPokemonId, getPokemonImage } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailSeo() {
  const { pokemonSpecies, pokemon } = useCurrentPokemon();

  const displayedPokemonName = snakeCaseToTitleCase(pokemon.name);
  const types = pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name);

  const pokemonDescription =
    pokemonSpecies.descriptions.find((description) =>
      description.toLowerCase().includes(pokemonSpecies.name),
    ) || pokemonSpecies.descriptions[0];

  const seoDescription =
    `${displayedPokemonName}` +
    ` #${formatPokemonId(pokemon.id)}` +
    ` (${types.join(', ')})` +
    ` - ${pokemonDescription}`;

  return (
    <NextSeo
      title={`${displayedPokemonName} #${formatPokemonId(pokemon.id)}`}
      description={seoDescription}
      openGraph={{
        images: [
          {
            url: getPokemonImage(pokemon.id),
            width: 475,
            height: 475,
            alt: displayedPokemonName,
            type: 'image/png',
          },
        ],
      }}
    />
  );
}
