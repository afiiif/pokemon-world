import { isBrowser } from 'react-power-ups/lib/utils';

import { titleCaseToSnakeCase } from '@/utils/string';

import { MAX_POKEMON_TO_COMPARE } from '../constants';

export const getPokemonsParam = () => {
  if (!isBrowser) return [];

  const queryString = new URLSearchParams(window.location.search);
  const pokemonsString = queryString.get('pokemons');
  const pokemons = pokemonsString?.split(',').filter(Boolean) || [];
  return [...new Set(pokemons)].slice(0, MAX_POKEMON_TO_COMPARE);
};

export const getNewRoute = ({
  addPokemon,
  removePokemon,
}: {
  addPokemon?: string;
  removePokemon?: string;
}) => {
  const pokemons = getPokemonsParam();
  const newPokemons = addPokemon
    ? [...pokemons, titleCaseToSnakeCase(addPokemon)]
    : pokemons.filter((pokemon) => pokemon !== removePokemon);
  return `${window.location.pathname}?pokemons=${[...new Set(newPokemons)].join(',')}`;
};
