/* eslint-disable prefer-destructuring */
import { gql, request } from 'graphql-request';
import { mkdirSync, writeFileSync } from 'node:fs';

import { API_ENDPOINT, TYPE_COLOR } from '../src/constants/pokemon';
import { PokemonBase } from '../src/types/pokemon';
import { snakeCaseToTitleCase } from '../src/utils/string';

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

// eslint-disable-next-line sonarjs/cognitive-complexity
const computeRank = (typeRelation: number[][]) => {
  type Rank = { n: number; type?: string[] }[];
  const largestSingleType: Rank = [{ n: 0 }, { n: 0 }, { n: 0 }];
  const largestMultiType: Rank = [{ n: 0 }, { n: 0 }, { n: 0 }];
  const smallestSingleType: Rank = [{ n: Infinity }, { n: Infinity }, { n: Infinity }];
  const smallestMultiType: Rank = [{ n: Infinity }, { n: Infinity }, { n: Infinity }];
  const noOccurenceMultiType: string[][] = [];

  for (let i = 0; i < typeRelation.length; i++) {
    for (let j = i; j < typeRelation.length; j++) {
      const currentTotal = typeRelation[i][j];
      if (i === j) {
        if (currentTotal >= largestSingleType[0].n) {
          largestSingleType[2] = largestSingleType[1];
          largestSingleType[1] = largestSingleType[0];
          largestSingleType[0] = { n: currentTotal, type: [TYPES[i]] };
        } else if (currentTotal >= largestSingleType[1].n) {
          largestSingleType[2] = largestSingleType[1];
          largestSingleType[1] = { n: currentTotal, type: [TYPES[i]] };
        } else if (currentTotal >= largestSingleType[2].n) {
          largestSingleType[2] = { n: currentTotal, type: [TYPES[i]] };
        }
        if (currentTotal <= smallestSingleType[0].n) {
          smallestSingleType[2] = smallestSingleType[1];
          smallestSingleType[1] = smallestSingleType[0];
          smallestSingleType[0] = { n: currentTotal, type: [TYPES[i]] };
        } else if (currentTotal <= smallestSingleType[1].n) {
          smallestSingleType[2] = smallestSingleType[1];
          smallestSingleType[1] = { n: currentTotal, type: [TYPES[i]] };
        } else if (currentTotal <= smallestSingleType[2].n) {
          smallestSingleType[2] = { n: currentTotal, type: [TYPES[i]] };
        }
      } else {
        if (currentTotal >= largestMultiType[0].n) {
          largestMultiType[2] = largestMultiType[1];
          largestMultiType[1] = largestMultiType[0];
          largestMultiType[0] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
        } else if (currentTotal >= largestMultiType[1].n) {
          largestMultiType[2] = largestMultiType[1];
          largestMultiType[1] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
        } else if (currentTotal >= largestMultiType[2].n) {
          largestMultiType[2] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
        }
        if (currentTotal) {
          if (currentTotal <= smallestMultiType[0].n) {
            smallestMultiType[2] = smallestMultiType[1];
            smallestMultiType[1] = smallestMultiType[0];
            smallestMultiType[0] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
          } else if (currentTotal <= smallestMultiType[1].n) {
            smallestMultiType[2] = smallestMultiType[1];
            smallestMultiType[1] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
          } else if (currentTotal <= smallestMultiType[2].n) {
            smallestMultiType[2] = { n: currentTotal, type: [TYPES[i], TYPES[j]] };
          }
        } else {
          noOccurenceMultiType.push([TYPES[i], TYPES[j]]);
        }
      }
    }
  }

  return {
    largestSingleType,
    largestMultiType,
    smallestSingleType,
    smallestMultiType,
    noOccurenceMultiType,
  };
};

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

  const rank = computeRank(typeRelation);

  mkdirSync('public/generated/statistics', { recursive: true });
  writeFileSync('public/generated/statistics/types.json', JSON.stringify(statistics));
  writeFileSync('public/generated/statistics/types-rank.json', JSON.stringify(rank));
});
