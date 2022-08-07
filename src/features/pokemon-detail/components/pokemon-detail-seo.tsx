import { NextSeo } from 'next-seo';

import { formatPokemonId } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailSeo() {
  const { pokemonSpecies, pokemon } = useCurrentPokemon();

  const types = pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name);

  const pokemonDescription =
    pokemonSpecies.descriptions.find((description) =>
      description.toLowerCase().includes(pokemonSpecies.name),
    ) || pokemonSpecies.descriptions[0];

  const seoDescription =
    `${snakeCaseToTitleCase(pokemon.name)}` +
    ` #${formatPokemonId(pokemon.id)}` +
    ` (${types.join(', ')})` +
    ` - ${pokemonDescription}`;

  return (
    <NextSeo
      title={`${snakeCaseToTitleCase(pokemon.name)} #${formatPokemonId(pokemon.id)}`}
      description={seoDescription}
    />
  );
}
