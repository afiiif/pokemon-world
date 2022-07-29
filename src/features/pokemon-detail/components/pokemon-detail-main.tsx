import clsx from 'clsx';
import Image from 'next/future/image';
import { useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

import { useQueryPokemonTypes } from '@/api/queries/pokemon';
import { getPokemonId, getPokemonImage } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailButton, { CatchState } from './pokemon-detail-button';

export default function PokemonDetailMain() {
  const { pokemon } = useCurrentPokemon();
  const pokemonTypes = useQueryPokemonTypes(pokemon.name).data!;
  const displayedPokemonName = snakeCaseToTitleCase(pokemon.name);

  const [catchState, setCatchState] = useState<CatchState>('void');

  return (
    <>
      <div className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 md:h-80 md:w-80" />
      <div className="pokeball-flat right-20 top-64 origin-top-right -rotate-12 scale-[2.2] sm:right-32 sm:scale-[2.8]" />
      <FaAngleDoubleRight className="absolute top-72 left-28 hidden scale-[1.7] text-9xl text-white/10 md:block" />

      <h1 className="relative col-span-full text-3xl font-bold">{displayedPokemonName}</h1>
      <div className="relative col-span-full text-2xl">{getPokemonId(pokemon.id)}</div>
      <div className="-mt-8 pl-8 pr-4 md:col-start-2 md:-mt-16 md:px-6">
        <Image
          key={catchState}
          src={getPokemonImage(pokemon.id)}
          alt={displayedPokemonName}
          width={400}
          height={400}
          quality={25}
          className={clsx(
            'relative mx-auto w-full max-w-[400px] place-self-end drop-shadow-2xl',
            catchState === 'catching' && 'pokemon-shrinking',
            catchState === 'fail' && 'pokemon-release',
            catchState === 'success' && 'pokemon-release-delayed',
          )}
        />
      </div>

      <div id="_pokemon-detail-base-props">
        <div>
          <div className="flex justify-center gap-1.5 pb-1">
            {pokemonTypes.map((type) => (
              <div key={type} className={`bg-elm-${type} h-3.5 w-3.5 rounded-full`} />
            ))}
          </div>
          <div className="font-medium capitalize">{pokemonTypes.join(' / ')}</div>
          <div className="text-gray-500">Type</div>
        </div>
        <div>
          <div className="pb-0.5 text-xl font-bold">{pokemon.height! / 10} m</div>
          <div className="text-gray-500">Height</div>
        </div>
        <div>
          <div className="pb-0.5 text-xl font-bold">{pokemon.weight! / 10} kg</div>
          <div className="text-gray-500">Weight</div>
        </div>
      </div>

      <div className="mt-4 md:row-start-4 md:self-end md:justify-self-start">
        <PokemonDetailButton catchState={catchState} setCatchState={setCatchState} />
      </div>
    </>
  );
}
