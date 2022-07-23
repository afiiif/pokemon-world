import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { FaAngleDoubleRight } from 'react-icons/fa';

import { Pokemon_V2_Pokemon } from '@/generated/graphql.types';
import { getDescription, getPokemonImage } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

type Props = {
  pokemon: Pokemon_V2_Pokemon;
};

export default function PokemonDetailCard({ pokemon }: Props) {
  const pokemonName = snakeCaseToTitleCase(pokemon.name);
  const types = pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type!.name);

  return (
    <section
      className={`pokemon-elm relative -mx-3.5 -mt-3.5 overflow-hidden lg:m-0 lg:-mt-4 bg-elm-${types[0]} grid p-3.5 pt-6 md:grid-cols-[auto,_28rem] md:p-6 lg:rounded-md`}
    >
      <NextSeo title={pokemonName} description={getDescription(pokemon)} />

      <div className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 md:h-80 md:w-80" />
      <div className="pokeball-flat right-20 top-64 origin-top-right -rotate-12 scale-[2.2] sm:right-32 sm:scale-[2.8]" />
      <FaAngleDoubleRight className="absolute top-72 left-28 hidden scale-[1.7] text-9xl text-white/10 md:block" />

      <h1 className="relative col-span-full text-3xl font-bold">{pokemonName}</h1>
      <div className="relative col-span-full text-2xl">{String(pokemon.id).padStart(3, '0')}</div>
      <div className="-mt-8 pl-8 pr-4 md:col-start-2 md:-mt-16 md:px-6">
        <Image
          src={getPokemonImage(pokemon.id)}
          alt={pokemonName}
          width={400}
          height={400}
          quality={25}
          className="relative mx-auto w-full max-w-[400px] place-self-end drop-shadow-2xl"
        />
      </div>

      <div className="relative flex items-end divide-x divide-white rounded-md bg-white/60 py-3 text-center text-xs text-gray-700 md:col-start-2">
        <div className="grow px-2">
          <div className="flex justify-center gap-1.5 pb-1">
            {types.map((type) => (
              <div key={type} className={`bg-elm-${type} h-3.5 w-3.5 rounded-full`} />
            ))}
          </div>
          <div className="font-medium capitalize">{types.join(' / ')}</div>
          <div className="text-gray-500">Type</div>
        </div>
        <div className="grow px-2">
          <div className="pb-0.5 text-xl font-bold">{pokemon.height! / 10} m</div>
          <div className="text-gray-500">Height</div>
        </div>
        <div className="grow px-2">
          <div className="pb-0.5 text-xl font-bold">{pokemon.weight! / 10} kg</div>
          <div className="text-gray-500">Weight</div>
        </div>
      </div>

      <div className="mt-4 md:row-start-4 md:self-end md:justify-self-start">
        <button
          type="button"
          className="w-full rounded-full bg-white py-3 px-12 text-gray-700 shadow-md active:translate-y-1"
        >
          Catch!
        </button>
      </div>
    </section>
  );
}
