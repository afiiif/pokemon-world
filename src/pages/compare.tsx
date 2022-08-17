import Image from 'next/future/image';
import { NextSeo } from 'next-seo';

import { useQueryPokemon } from '@/api/queries/pokemon';
import PokemonComparison from '@/features/compare-pokemons/components/pokemon-comparison';
import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import usePokemonsParam from '@/features/compare-pokemons/hooks/use-pokemons-param';
import { getPokemonImage } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function ComparePokemonsPage() {
  const pokemons = usePokemonsParam();

  const pokemon = useQueryPokemon(pokemons[0], { enabled: !!pokemons[0] }).data;

  if (pokemons.length === 0) {
    return (
      <>
        <NextSeo title="Compare Pokemons" />
        <h1 className="pb-6 text-2xl font-bold">Compare Pokemons</h1>
        <SearchPokemon />
      </>
    );
  }

  return (
    <>
      <NextSeo title="Compare Pokemons" />
      {pokemons.length === 1 ? (
        <>
          <h1 className="pb-6 text-2xl font-bold">
            Compare {snakeCaseToTitleCase(pokemons[0])} with...
          </h1>
          <SearchPokemon />
          {pokemon && (
            <div className="mx-auto flex w-80 items-center justify-around pt-8 md:mx-0">
              <Image
                src={getPokemonImage(pokemon.id)}
                alt={pokemon.name}
                width={128}
                height={128}
                quality={25}
              />
              <div className="text-2xl">VS</div>
              <div className="text-6xl">❓</div>
            </div>
          )}
        </>
      ) : (
        <PokemonComparison />
      )}
    </>
  );
}
