import Image from 'next/future/image';

import { useQueryPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { formatPokemonId, getPokemonImage } from '@/helpers/pokemon';

type Props = {
  pokemonName: string;
};

export default function MainSection({ pokemonName }: Props) {
  const pokemon = useQueryPokemon(pokemonName).data;
  const pokemonTypes = useQueryPokemonTypes(pokemonName).data!;

  if (!pokemon) {
    return (
      <div className="pokemon-elm relative h-72 rounded-md bg-gray-200 p-2.5 pt-16 shadow-md">
        <div className="pokeball-flat left-1/2 top-32 -translate-x-1/2 animate-pulse opacity-30 invert" />
      </div>
    );
  }

  return (
    <div
      className={`pokemon-elm relative rounded-md p-2.5 pt-16 shadow-md bg-elm-${pokemonTypes[0]}`}
    >
      <Image
        src={getPokemonImage(pokemon.id)}
        alt={pokemon.name}
        width={128}
        height={128}
        quality={25}
        className="mx-auto text-center"
        priority
      />
      <div className="pt-2 pb-3 text-center">#{formatPokemonId(pokemon.id)}</div>

      <div className="rounded-md bg-white/60 p-2.5 text-center text-xs text-gray-700">
        <div className="flex justify-center gap-1.5 pb-1">
          {pokemonTypes.map((type) => (
            <div key={type} className={`bg-elm-${type} h-3.5 w-3.5 rounded-full`} />
          ))}
        </div>
        <div className="font-medium capitalize">{pokemonTypes.join(' / ')}</div>
        <div className="text-gray-500">Type</div>
      </div>
      <div className="mt-2 flex gap-2">
        <div className="flex-1 rounded-md bg-white/60 p-2.5 text-center text-xs text-gray-700">
          <div className="text-base font-bold">{pokemon.height! / 10} m</div>
          <div className="text-gray-500">Height</div>
        </div>
        <div className="flex-1 rounded-md bg-white/60 p-2.5 text-center text-xs text-gray-700">
          <div className="text-base font-bold">{pokemon.weight! / 10} kg</div>
          <div className="text-gray-500">Weight</div>
        </div>
      </div>
    </div>
  );
}
