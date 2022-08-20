import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { MyPokemon } from '@/types/pokemon';

type ContextValue = {
  myPokemons: MyPokemon[];
  setMyPokemons: Dispatch<SetStateAction<MyPokemon[]>>;
};

export const MyPokemonsContext = createContext<ContextValue | null>(null);

export const useMyPokemons = () => useContext(MyPokemonsContext)!;
