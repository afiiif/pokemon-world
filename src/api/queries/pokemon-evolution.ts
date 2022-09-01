import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { PokemonEvolutionFilter } from '@/pages/api/pokemons/evolution';
import { PokemonEvolution } from '@/types/pokemon';

type QueryPokemonEvolutionKey = ['pokemon-evolution', PokemonEvolutionFilter, number];

export const fetchPokemonEvolution = async (
  ctx: QueryFunctionContext<QueryPokemonEvolutionKey>,
): Promise<PokemonEvolution[]> => {
  const [, { generationId, type }, page] = ctx.queryKey;

  const res = await fetch(
    `/api/pokemons/evolution?generationId=${generationId}&type=${type}&page=${page}`,
  );
  return res.json();
};

export const useQueryPokemonEvolution = (filter: PokemonEvolutionFilter, page: number) =>
  useQuery(['pokemon-evolution', filter, page], fetchPokemonEvolution);
