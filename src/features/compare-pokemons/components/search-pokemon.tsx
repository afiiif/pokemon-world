import { Combobox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFirstMount } from 'react-power-ups';

import { usePokemonNames } from '@/api/queries/pokemon-names';

import { getNewRoute, getPokemonsParam } from '../utils/url';

export default function SearchPokemon() {
  const { replace } = useRouter();

  const { data = [] } = usePokemonNames();
  const [keyword, setKeyword] = useState('');
  const filteredPokemons = data
    .filter((pokemon) =>
      pokemon.toLowerCase().replace(/\s+/g, '').includes(keyword.toLowerCase().replace(/\s+/g, '')),
    )
    .slice(0, 10);

  const isFirstMount = useFirstMount();
  const pokemons = getPokemonsParam();
  const placeholder =
    !isFirstMount && pokemons.length > 0
      ? '🔍 Add more pokemon to the comparison'
      : '🔍 Search Pokemon to be compared';

  return (
    <Combobox
      value={null}
      onChange={(pokemon: string) => replace(getNewRoute({ addPokemon: pokemon }))}
    >
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border py-2 px-3"
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder={placeholder}
          maxLength={11}
        />
        <Transition
          as="div"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {keyword && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredPokemons.length === 0 ? (
                <div className="cursor-default select-none py-2 px-4 text-gray-500">
                  Nothing found.
                </div>
              ) : (
                filteredPokemons.map((pokemon) => (
                  <Combobox.Option
                    key={pokemon}
                    className={({ active }) =>
                      clsx(
                        'relative cursor-default select-none truncate py-2 px-4',
                        active && 'bg-slate-600 text-white',
                      )
                    }
                    value={pokemon}
                  >
                    {pokemon}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          )}
        </Transition>
      </div>
    </Combobox>
  );
}
