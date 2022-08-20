import { ReactNode, useMemo } from 'react';
import { useLocalStorage } from 'react-power-ups';

import { MyPokemon } from '@/types/pokemon';

import { MyPokemonsContext } from '../contexts/my-pokemons';
import { validateLocalStorageData } from '../utils/validate-local-storage';

type Props = {
  children: ReactNode;
};

export default function MyPokemonsProvider({ children }: Props) {
  const [myPokemons, setMyPokemons] = useLocalStorage<MyPokemon[]>({
    key: 'myPokemons',
    initialValue: [],
    validator: validateLocalStorageData,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ myPokemons, setMyPokemons }), [myPokemons]);

  return <MyPokemonsContext.Provider value={value}>{children}</MyPokemonsContext.Provider>;
}
