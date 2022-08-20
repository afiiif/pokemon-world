import { ReactNode, useMemo, useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { MyPokemon } from '@/types/pokemon';

import { MyPokemonsContext } from '../contexts/my-pokemons';
import { validateLocalStorageData } from '../utils/validate-local-storage';

type Props = {
  children: ReactNode;
};

export default function MyPokemonsProvider({ children }: Props) {
  const [myPokemons, setMyPokemons] = useState<MyPokemon[]>([]);

  useIsomorphicLayoutEffect(() => {
    try {
      const savedValue = JSON.parse(localStorage.myPokemons);
      if (validateLocalStorageData(savedValue)) {
        setMyPokemons(savedValue);
      }
    } catch {
      localStorage.removeItem('myPokemons');
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    localStorage.myPokemons = JSON.stringify(myPokemons);
  }, [myPokemons]);

  const value = useMemo(() => ({ myPokemons, setMyPokemons }), [myPokemons]);

  return <MyPokemonsContext.Provider value={value}>{children}</MyPokemonsContext.Provider>;
}
