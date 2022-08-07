export const formatPokemonId = (id: number | string) => String(id).padStart(3, '0');

export const getPokemonImage = (id: number | string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
