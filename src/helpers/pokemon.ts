import { PokemonBase } from '@/types/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export const getPokemonId = (id: number | string) => String(id).padStart(3, '0');

export const getPokemonImage = (id: number | string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getDescription = (pokemon: PokemonBase) => {
  const types = pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name);

  return (
    `${snakeCaseToTitleCase(pokemon.name)} #${getPokemonId(pokemon.id)}` +
    ` | Type: ${types.join(', ')}` +
    ` | Height ${pokemon.height! / 10}m` +
    ` | Weight ${pokemon.weight! / 10}kg` +
    ` | Pokemon World`
  );
};
