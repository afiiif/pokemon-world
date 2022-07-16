import { useQuery } from 'react-query';

import { Pokemon_V2_Generation, Pokemon_V2_Type } from '@/generated/graphql.types';
import { toSentenceCase } from '@/utils/string';

import fetcher from '../fetcher';

const POKEMON_GENERATIONS_AND_TYPES = /* GraphQL */ `
  query PokemonsGenAndTypes {
    pokemon_v2_generation {
      id
      name
    }
    pokemon_v2_pokemontype(order_by: { type_id: asc }, distinct_on: type_id) {
      pokemon_v2_type {
        id
        name
      }
    }
  }
`;

export type QueryPokemonsGenAndTypesKey = ['pokemon-g&t'];
export type QueryPokemonsGenAndTypesResData = {
  pokemon_v2_generation: Pick<Pokemon_V2_Generation, 'id' | 'name'>[];
  pokemon_v2_pokemontype: { pokemon_v2_type: Pick<Pokemon_V2_Type, 'id' | 'name'> }[];
};
export type QueryPokemonsGenAndTypesData = {
  generations: Pick<Pokemon_V2_Generation, 'id' | 'name'>[];
  types: Pick<Pokemon_V2_Type, 'id' | 'name'>[];
};

export const queryPokemonGenAndTypes: () => Promise<QueryPokemonsGenAndTypesData> = async () => {
  const res = await fetcher<QueryPokemonsGenAndTypesResData>(POKEMON_GENERATIONS_AND_TYPES);

  return {
    generations: res.pokemon_v2_generation.map(({ id, name }) => {
      const [, generationNumber] = name.split('-');
      return {
        id,
        name: `Generation ${generationNumber.toUpperCase()}`,
      };
    }),
    types: res.pokemon_v2_pokemontype.map(({ pokemon_v2_type }) => ({
      id: pokemon_v2_type!.id,
      name: toSentenceCase(pokemon_v2_type!.name),
    })),
  };
};

export const useQueryPokemonGenAndTypes = () =>
  useQuery<
    QueryPokemonsGenAndTypesData,
    unknown,
    QueryPokemonsGenAndTypesData,
    QueryPokemonsGenAndTypesKey
  >(['pokemon-g&t'], queryPokemonGenAndTypes);
