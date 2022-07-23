import { QueryFunctionContext, useQuery } from 'react-query';

import { Pokemon_V2_Pokemonspecies } from '@/generated/graphql.types';

import fetcher from '../fetcher';

const POKEMON = /* GraphQL */ `
  query Pokemon($name: String) {
    pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
      id
      name
      pokemon_v2_pokemons {
        id
        name
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            id
            name
          }
        }
        pokemon_v2_pokemonstats {
          stat_id
          base_stat
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonmoves {
          pokemon_v2_move {
            name
            power
          }
        }
      }
    }
  }
`;

export type QueryPokemonKey = ['pokemon', string];
export type QueryPokemonData = {
  pokemon_v2_pokemonspecies: Pokemon_V2_Pokemonspecies[];
};

export const queryPokemon = (ctx: QueryFunctionContext<QueryPokemonKey>) =>
  fetcher<QueryPokemonData>(POKEMON, { name: ctx.queryKey[1] });

export const useQueryPokemon = (name: string) =>
  useQuery<QueryPokemonData, unknown, QueryPokemonData, QueryPokemonKey>(
    ['pokemon', name],
    queryPokemon,
  );
