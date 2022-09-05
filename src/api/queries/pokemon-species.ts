import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { Maybe, Pokemon_V2_Pokemon, Pokemon_V2_Pokemonspecies } from '@/generated/graphql.types';

import fetcher from '../fetcher';

const POKEMON_SPECIES = /* GraphQL */ `
  query PokemonSpecies($name: String) {
    pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
      id
      name
      pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        distinct_on: flavor_text
      ) {
        id
        flavor_text
      }
      pokemon_v2_pokemonhabitat {
        name
      }
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
      pokemon_v2_pokemonspeciesflavortexts: { id: number; flavor_text: string }[];
      pokemon_v2_pokemonhabitat: Maybe<{ name: string }>;
      pokemon_v2_pokemons: Pick<Pokemon_V2_Pokemon, 'id' | 'name' | 'pokemon_v2_pokemontypes'>[];
    },
  ];
};

export type QueryPokemonSpeciesKey = ['pokemon-species', string];
export type QueryPokemonSpeciesData = Omit<
  FetchPokemonSpeciesResponse['pokemon_v2_pokemonspecies'][0],
  'pokemon_v2_pokemonspeciesflavortexts' | 'pokemon_v2_pokemonhabitat'
> & {
  descriptions: string[];
  habitat?: string;
};

export const fetchPokemonSpecies = async (ctx: QueryFunctionContext<QueryPokemonSpeciesKey>) => {
  const res = await fetcher<FetchPokemonSpeciesResponse>(POKEMON_SPECIES, {
    name: ctx.queryKey[1],
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { pokemon_v2_pokemonspeciesflavortexts, pokemon_v2_pokemonhabitat, ...pokemonSpecies } =
    res.pokemon_v2_pokemonspecies[0];

  const descriptions: string[] = [];
  res.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts
    .sort((a, b) => a.id - b.id)
    .forEach(({ flavor_text }) => {
      const normalizedText = flavor_text.replaceAll(/[\n\f]/g, ' ');

      // The descriptions have duplicate items, so we need to clean the duplicate items.
      const index = descriptions.findIndex((description) => {
        const existing = description.toLowerCase().split(' ');
        const existingFirst3words = existing.slice(0, 3).join(' ');
        const existingLast3words = existing.slice(-3).join(' ');

        const current = normalizedText.toLowerCase().split(' ');
        const currentFirst3words = current.slice(0, 3).join(' ');
        const currentLast3words = current.slice(-3).join(' ');

        // LowerCasing-then-compare is not enough since sometimes the difference is just between singular & plural word.
        return (
          existingFirst3words === currentFirst3words || existingLast3words === currentLast3words
        );
      });
      if (index === -1) {
        descriptions.push(normalizedText);
      } else {
        descriptions[index] = normalizedText;
      }
    });

  return {
    ...pokemonSpecies,
    descriptions,
    habitat: pokemon_v2_pokemonhabitat?.name,
  };
};

export const useQueryPokemonSpecies = (name: string) =>
  useQuery<QueryPokemonSpeciesData, unknown, QueryPokemonSpeciesData, QueryPokemonSpeciesKey>(
    ['pokemon-species', name],
    fetchPokemonSpecies,
  );
