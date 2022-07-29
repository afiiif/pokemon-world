import { QueryPokemonSpeciesData } from '@/api/queries/pokemon-species';
import { PokemonBase } from '@/types/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export const formatPokemonId = (id: number | string) => String(id).padStart(3, '0');

export const getPokemonImage = (id: number | string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getDescription = (pokemonSpecies: QueryPokemonSpeciesData, pokemon: PokemonBase) => {
  const types = pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name);

  const pokemonDescription =
    pokemonSpecies.descriptions.find((description) =>
      description.toLowerCase().includes(pokemonSpecies.name),
    ) || pokemonSpecies.descriptions[0];

  return (
    `${snakeCaseToTitleCase(pokemon.name)}` +
    ` #${formatPokemonId(pokemon.id)}` +
    ` (${types.join(', ')})` +
    ` - ${pokemonDescription}`
  );
};
