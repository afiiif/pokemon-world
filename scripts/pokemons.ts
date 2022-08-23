import { gql, request } from 'graphql-request';
import { mkdirSync, writeFileSync } from 'node:fs';

import { snakeCaseToTitleCase } from '../src/utils/string';

const API_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

const query = gql`
  {
    pokemon_v2_pokemon {
      name
    }
  }
`;

// eslint-disable-next-line unicorn/prefer-top-level-await
request<{ pokemon_v2_pokemon: { name: string }[] }>(API_ENDPOINT, query).then((data) => {
  const pokemons = data.pokemon_v2_pokemon.map((pokemon) => pokemon.name);
  const pokemonsTitleCase = pokemons.map(snakeCaseToTitleCase);

  mkdirSync('public/generated', { recursive: true });
  writeFileSync('public/generated/pokemons.json', JSON.stringify(pokemonsTitleCase));
  writeFileSync('public/generated/pokemons-snake-case.json', JSON.stringify(pokemons));
});
