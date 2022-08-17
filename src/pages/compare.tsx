import { NextSeo } from 'next-seo';

import PokemonComparison from '@/features/compare-pokemons/components/pokemon-comparison';
import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import usePokemonsParam from '@/features/compare-pokemons/hooks/use-pokemons-param';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function ComparePokemonsPage() {
  const pokemons = usePokemonsParam();

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
        </>
      ) : (
        <PokemonComparison />
      )}
    </>
  );
}
