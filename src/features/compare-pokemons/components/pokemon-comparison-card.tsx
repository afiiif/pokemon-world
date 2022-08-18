import clsx from 'clsx';
import { ReactNode } from 'react';

import usePokemonsParam from '../hooks/use-pokemons-param';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function PokemonComparisonCard({ className, children }: Props) {
  const pokemons = usePokemonsParam();

  return (
    <div
      className={clsx(
        'min-w-[15rem] flex-none pr-2 md:min-w-[15.5rem] lg:snap-start lg:pr-3',
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
