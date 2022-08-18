import { useRouter } from 'next/router';

import SearchPokemon from '@/features/compare-pokemons/components/search-pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';

export default function PokemonDetailCompare() {
  const { pokemon } = useCurrentPokemon();

  const { push } = useRouter();

  return (
    <PokemonDetailCard>
      <div className="pb-2">
        Compare <span className="font-semibold">{snakeCaseToTitleCase(pokemon.name)}</span> with...
      </div>
      <SearchPokemon
        onChange={(selectedPokemon) => push(`/compare?pokemons=${pokemon.name},${selectedPokemon}`)}
      />
    </PokemonDetailCard>
  );
}
