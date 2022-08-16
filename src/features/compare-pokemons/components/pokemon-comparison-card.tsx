import clsx from 'clsx';
import { ReactNode } from 'react';

import { getPokemonsParam } from '../utils/url';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function PokemonComparisonCard({ className, children }: Props) {
  const pokemons = getPokemonsParam();

  return (
    <div
      className={clsx(
        'min-w-[15rem] flex-none pr-2 lg:snap-start lg:pr-3',
        pokemons.length === 2 && 'w-1/2',
        pokemons.length === 3 && 'w-1/3',
        pokemons.length === 4 && 'w-1/4',
        pokemons.length > 4 && 'w-[15rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}
