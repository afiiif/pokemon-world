import fetcher from '../fetcher';

const BIGGEST_POSSIBLE_OFFSET = 1016;

type BasePokemon = {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
};

type FetchRandomPokemonNameResponse = {
  pokemon_v2_pokemon: Pokemon[];
};

export interface Pokemon extends BasePokemon {
  pokemon_v2_pokemons: [
    {
      pokemon_v2_pokemontypes: BasePokemon['pokemon_v2_pokemontypes'];
    },
  ];
}

/**
 * Generates a random integer within the specified range [min, max].
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} A random integer within the specified range.
 *
 * @example
 * const result = randomNumber(1, 10);
 */
const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomPokemon = async () => {
  const offset = randomNumber(0, BIGGEST_POSSIBLE_OFFSET);

  const POKEMON_QUERY = `
    query RandomPokemonNames {
      pokemon_v2_pokemon(
        limit: 1
        offset: ${offset}
      ) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const rawRes = await fetcher<FetchRandomPokemonNameResponse>(POKEMON_QUERY).then(
    (r) => r.pokemon_v2_pokemon[0],
  );
  const res: Pokemon = {
    ...rawRes,
    pokemon_v2_pokemons: [
      {
        pokemon_v2_pokemontypes: rawRes.pokemon_v2_pokemontypes,
      },
    ],
  };
  return res;
};
