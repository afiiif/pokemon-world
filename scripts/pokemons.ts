import { gql, request } from 'graphql-request';
import { mkdirSync, writeFileSync } from 'node:fs';

import { API_ENDPOINT } from '../src/constants/pokemon';
import { snakeCaseToTitleCase } from '../src/utils/string';

const query = gql`
  {
    pokemon_v2_pokemon {
      id
      name
    }
  }
`;

type ResponseData = {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
  }[];
};

request<ResponseData>(API_ENDPOINT, query).then((data) => {
  const pokemons = data.pokemon_v2_pokemon.map((pokemon) => pokemon.name);
  const pokemonsTitleCase = pokemons.map(snakeCaseToTitleCase);
  const pokemonsIds = data.pokemon_v2_pokemon.map((pokemon) => pokemon.id);

  mkdirSync('public/generated', { recursive: true });
  writeFileSync('public/generated/pokemons.json', JSON.stringify(pokemonsTitleCase));
  writeFileSync('public/generated/pokemons-snake-case.json', JSON.stringify(pokemons));
  writeFileSync('public/generated/pokemons-ids.json', JSON.stringify(pokemonsIds));
});
