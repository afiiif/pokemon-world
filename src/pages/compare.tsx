import { useQueryPokemon } from '@/api/queries/pokemon';
import PokemonImage from '@/components/commons/pokemon-image';
import PokemonComparison from '@/features/compare-pokemons/components/pokemon-comparison';
import PokemonComparisonSeo from '@/features/compare-pokemons/components/pokemon-comparison-seo';
import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import usePokemonsParam from '@/features/compare-pokemons/hooks/use-pokemons-param';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function ComparePokemonsPage() {
  const pokemons = usePokemonsParam();

  const pokemon = useQueryPokemon(pokemons[0], { enabled: !!pokemons[0] }).data;

  if (pokemons.length === 0) {
    return (
      <>
        <PokemonComparisonSeo />
        <h1 className="h1 pb-6">Compare Pokémons</h1>
        <SearchPokemon />
      </>
    );
  }

  return (
    <>
      <PokemonComparisonSeo />
      {pokemons.length === 1 ? (
        <>
          <h1 className="h1 pb-6">Compare {snakeCaseToTitleCase(pokemons[0])} with...</h1>
          <div className="max-w-xl">
            <SearchPokemon />
          </div>
          {pokemon && (
            <div className="flex max-w-xl items-center justify-around pt-8">
              <PokemonImage idPokemon={pokemon.id} alt={pokemon.name} size={128} />
              <div className="text-2xl">VS</div>
              <div className="w-32 pl-6 text-6xl">❓</div>
            </div>
          )}
        </>
      ) : (
        <PokemonComparison />
      )}
    </>
  );
}
