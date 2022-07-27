import { QueryFunctionContext, useQuery } from 'react-query';

import { Pokemon_V2_Pokemon, Pokemon_V2_Pokemonspecies } from '@/generated/graphql.types';

import fetcher from '../fetcher';

const POKEMON_SPECIES = /* GraphQL */ `
  query PokemonSpecies($name: String) {
    pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
      id
      name
      pokemon_v2_pokemons {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

type FetchPokemonSpeciesResponse = {
  pokemon_v2_pokemonspecies: [
    Pick<Pokemon_V2_Pokemonspecies, 'id' | 'name'> & {
      pokemon_v2_pokemons: Pick<Pokemon_V2_Pokemon, 'id' | 'name' | 'pokemon_v2_pokemontypes'>[];
    },
  ];
};

export type QueryPokemonSpeciesKey = ['pokemon-species', string];
export type QueryPokemonSpeciesData = FetchPokemonSpeciesResponse['pokemon_v2_pokemonspecies'][0];

export const fetchPokemonSpecies = async (ctx: QueryFunctionContext<QueryPokemonSpeciesKey>) => {
  const res = await fetcher<FetchPokemonSpeciesResponse>(POKEMON_SPECIES, {
    name: ctx.queryKey[1],
  });
  return res.pokemon_v2_pokemonspecies[0];
};

export const useQueryPokemonSpecies = (name: string) =>
  useQuery<QueryPokemonSpeciesData, unknown, QueryPokemonSpeciesData, QueryPokemonSpeciesKey>(
    ['pokemon-species', name],
    fetchPokemonSpecies,
  );
