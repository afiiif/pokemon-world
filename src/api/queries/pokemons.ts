import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

import { Pokemon_V2_Pokemonspecies } from '@/generated/graphql.types';

import fetcher from '../fetcher';

const LIMIT = 12;

export type QueryPokemonFilter = {
  name: string;
  generationId?: number;
  typeId?: number;
};
export type QueryPokemonsKey = ['pokemons', QueryPokemonFilter];
export type QueryPokemonsData = Pokemon_V2_Pokemonspecies[];

export const queryPokemons = async (ctx: QueryFunctionContext<QueryPokemonsKey>) => {
  const { name, generationId, typeId } = ctx.queryKey[1];

  const POKEMONS = `
    query Pokemons {
      pokemon_v2_pokemonspecies(
        order_by: { id: asc }
        offset: ${ctx.pageParam || 0}
        where: {
          name: { _ilike: "%${name}%" }
          ${generationId ? `generation_id: { _eq: ${generationId} }` : ''}
          ${
            typeId
              ? `pokemon_v2_pokemons: { pokemon_v2_pokemontypes: { type_id: { _eq: ${typeId} } } }`
              : ''
          }
        }
        limit: ${LIMIT}
      ) {
        id
        name
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
  `;

  const res = await fetcher<{ pokemon_v2_pokemonspecies: Pokemon_V2_Pokemonspecies[] }>(POKEMONS);
  return res.pokemon_v2_pokemonspecies;
};

export const useInfQueryPokemons = (filter: QueryPokemonFilter) =>
  useInfiniteQuery<QueryPokemonsData, unknown, QueryPokemonsData, QueryPokemonsKey>(
    ['pokemons', filter],
    queryPokemons,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < LIMIT ? undefined : allPages.length * LIMIT,
    },
  );
