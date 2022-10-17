import { QueryFunctionContext, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PokemonAbilities, PokemonBase, PokemonMoves, PokemonStats } from '@/types/pokemon';

import fetcher from '../fetcher';

const POKEMON = /* GraphQL */ `
  query Pokemon($name: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
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
          pokemon_v2_abilityeffecttexts(where: { language_id: { _eq: 9 } }) {
            short_effect
          }
        }
      }
      pokemon_v2_pokemonmoves(distinct_on: move_id) {
        pokemon_v2_move {
          name
          type_id
          power
          accuracy
          pp
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
    }
  }
`;

type FetchPokemonResponse = {
  pokemon_v2_pokemon: [
    PokemonBase & {
      pokemon_v2_pokemonstats: PokemonStats;
      pokemon_v2_pokemonabilities: PokemonAbilities;
      pokemon_v2_pokemonmoves: PokemonMoves;
    },
  ];
};

export type QueryPokemonKey = ['pokemon', string];
export type QueryPokemonData = FetchPokemonResponse['pokemon_v2_pokemon'][0];

export const fetchPokemon = async (ctx: QueryFunctionContext<QueryPokemonKey>) => {
  const res = await fetcher<FetchPokemonResponse>(POKEMON, { name: ctx.queryKey[1] });
  return res.pokemon_v2_pokemon[0];
};

export const useQueryPokemon = <T = QueryPokemonData>(
  name: string,
  options?: Omit<
    UseQueryOptions<QueryPokemonData, unknown, T, QueryPokemonKey>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<QueryPokemonData, unknown, T, QueryPokemonKey>(['pokemon', name], fetchPokemon, options);

export const useQueryPokemonTypes = (name: string) =>
  useQueryPokemon(name, {
    select: (data) =>
      data.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name),
  });
