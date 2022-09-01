import { useQuery } from '@tanstack/react-query';

const fetchPokemonNames: () => Promise<string[]> = async () => {
  const res = await fetch('/generated/pokemons.json');
  return res.json();
};

export const usePokemonNames = () => useQuery<string[]>(['pokemon-names'], fetchPokemonNames);
