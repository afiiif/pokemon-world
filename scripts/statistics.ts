import { gql, request } from 'graphql-request';
import { mkdirSync, writeFileSync } from 'node:fs';

import { TYPE_COLOR } from '../src/constants/pokemon';
import { PokemonBase } from '../src/types/pokemon';
import { snakeCaseToTitleCase } from '../src/utils/string';

const API_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

const query = gql`
  {
    pokemon_v2_pokemon {
      name
      weight
      height
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

type FetchPokemonsResponse = {
  pokemon_v2_pokemon: PokemonBase[];
};

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

const KEYOF_TYPES = Object.fromEntries(TYPES.map((type, idx) => [type, idx]));

const TYPES_COLORS = TYPES.map((type) => TYPE_COLOR[type as keyof typeof TYPE_COLOR]);

// eslint-disable-next-line unicorn/prefer-top-level-await
request<FetchPokemonsResponse>(API_ENDPOINT, query).then((data) => {
  const typeRelation = TYPES.map(() => TYPES.map(() => 0));
  const pokemons = {};

  data.pokemon_v2_pokemon.forEach((pokemon) => {
    const [type1, type2] = pokemon.pokemon_v2_pokemontypes
      .map(({ pokemon_v2_type }) => pokemon_v2_type!.name)
      .sort();

    if (type2) {
      typeRelation[KEYOF_TYPES[type1]][KEYOF_TYPES[type2]] += 1;
      typeRelation[KEYOF_TYPES[type2]][KEYOF_TYPES[type1]] += 1;
    } else {
      typeRelation[KEYOF_TYPES[type1]][KEYOF_TYPES[type1]] += 1;
    }

    const groupKey = `${snakeCaseToTitleCase(type1)}.${snakeCaseToTitleCase(
      type2 || type1,
    )}` as keyof typeof pokemons;
    if (pokemons[groupKey]) {
      (pokemons[groupKey] as string[]).push(pokemon.name);
    } else {
      (pokemons[groupKey] as string[]) = [pokemon.name];
    }
  });

  const statistics = {
    keys: TYPES.map(snakeCaseToTitleCase),
    colors: TYPES_COLORS,
    data: typeRelation,
    pokemons,
  };

  mkdirSync('public/generated', { recursive: true });
  writeFileSync('public/generated/statistics.json', JSON.stringify(statistics));
});
