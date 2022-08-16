import { useRouter } from 'next/router';

import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailCompare() {
  const { pokemon } = useCurrentPokemon();

  const { push } = useRouter();

  return (
    <section className="pokemon-detail-card">
      <div className="pb-2">Compare {snakeCaseToTitleCase(pokemon.name)} with...</div>
      <SearchPokemon
        onChange={(selectedPokemon) => push(`/compare?pokemons=${pokemon.name},${selectedPokemon}`)}
      />
    </section>
  );
}
