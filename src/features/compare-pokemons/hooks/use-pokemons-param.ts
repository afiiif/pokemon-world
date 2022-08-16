import { useRouter } from 'next/router';

import { MAX_POKEMON_TO_COMPARE } from '../constants';

export default function usePokemonsParam() {
  const { query } = useRouter();

  const pokemons = (query.pokemons as string | undefined)?.split(',').filter(Boolean) || [];

  return [...new Set(pokemons)].slice(0, MAX_POKEMON_TO_COMPARE);
}
