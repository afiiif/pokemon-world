import clsx from 'clsx';
import Image from 'next/future/image';
import { useState } from 'react';

import { useQueryPokemonTypes } from '@/api/queries/pokemon';
import PokemonImage from '@/components/commons/pokemon-image';
import { formatPokemonId } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailButton, { CatchState } from './pokemon-detail-button';
import PokemonDetailForms from './pokemon-detail-forms';

export default function PokemonDetailMain() {
  const { pokemon } = useCurrentPokemon();
  const pokemonTypes = useQueryPokemonTypes(pokemon.name).data!;
  const displayedPokemonName = snakeCaseToTitleCase(pokemon.name);

  const [catchState, setCatchState] = useState<CatchState>('void');

  return (
    <>
      <div className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 md:h-80 md:w-80" />
      <div className="pokeball-flat right-20 top-64 origin-top-right -rotate-12 scale-[2.2] sm:right-32 sm:scale-[2.8]" />
      <Image
        src={`/icons/pokemon-types/${pokemonTypes[0]}.svg`}
        alt={pokemonTypes[0]}
        width={230}
        height={230}
        quality={25}
        className="absolute top-56 left-[calc(40%_-_17rem)] hidden opacity-10 md:block"
      />

      <h1 className="h1 relative col-span-full">{displayedPokemonName}</h1>
      <div className="relative">
        <PokemonDetailForms />
        <div className="text-2xl">#{formatPokemonId(pokemon.id)}</div>
      </div>
      <div className="-mt-8 pl-8 pr-4 md:-mt-8 md:px-6">
        <PokemonImage
          key={catchState}
          idPokemon={pokemon.id}
          alt={displayedPokemonName}
          size={400}
          priority
          className={clsx(
            'relative mx-auto inline-block w-full max-w-[400px] place-self-end drop-shadow-2xl',
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

      <div className="mt-4 md:row-start-3 md:self-end md:justify-self-start">
        <PokemonDetailButton catchState={catchState} setCatchState={setCatchState} />
      </div>
    </>
  );
}
