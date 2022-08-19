import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiChevronDown } from 'react-icons/hi';

import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailForms() {
  const { pokemonSpecies } = useCurrentPokemon();
  const hasForms = pokemonSpecies.pokemon_v2_pokemons.length > 1;
  const { asPath } = useRouter();

  if (!hasForms) {
    return null;
  }

  return (
    <Menu>
      <Menu.Button className="mb-3 mt-2 flex items-center gap-2 rounded-md bg-white/60 px-3 py-1.5 text-typography-light">
        Forms ({pokemonSpecies.pokemon_v2_pokemons.length}) <HiChevronDown />
      </Menu.Button>
      <Menu.Items className="absolute top-12 z-10 max-h-96 overflow-x-auto rounded-md bg-white py-2 text-typography-light dark:bg-dark-light dark:text-typography-dark">
        {pokemonSpecies.pokemon_v2_pokemons.map((pokemon) => {
          const href =
            pokemon.name === pokemonSpecies.name
              ? `/pokemon/${pokemonSpecies.name}`
              : `/pokemon/${pokemonSpecies.name}/${pokemon.name}`;
          return (
            <Menu.Item key={pokemon.name}>
              {({ active }) => (
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-1 py-1 px-3',
                    active && 'bg-slate-50 dark:bg-slate-700',
                    asPath === href && 'font-semibold',
                  )}
                  replace
                  scroll={false}
                >
                  {snakeCaseToTitleCase(pokemon.name)}
                  <span className="text-xs text-gray-400">
                    {'• '}
                    {pokemon.pokemon_v2_pokemontypes
                      .map(({ pokemon_v2_type }) => pokemon_v2_type!.name)
                      .join(', ')}
                  </span>
                </Link>
              )}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
