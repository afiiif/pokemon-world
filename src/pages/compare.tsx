import { NextSeo } from 'next-seo';
import { useFirstMount } from 'react-power-ups';

import PokemonComparison from '@/features/compare-pokemons/components/pokemon-comparison';
import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import { getPokemonsParam } from '@/features/compare-pokemons/utils/url';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function ComparePokemonsPage() {
  const isFirstMount = useFirstMount();

  const pokemons = getPokemonsParam();

  if (isFirstMount || pokemons.length === 0) {
    return (
      <>
        <NextSeo title="Compare Pokemons" />
        <h1 className="pt-4 pb-6 text-2xl font-bold">Compare Pokemons</h1>
        <SearchPokemon />
      </>
    );
  }

  return (
    <>
      <NextSeo title="Compare Pokemons" />
      {pokemons.length === 1 ? (
        <>
          <h1 className="pt-4 pb-6 text-2xl font-bold">
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
