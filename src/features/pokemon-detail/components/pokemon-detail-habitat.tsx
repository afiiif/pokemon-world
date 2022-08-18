import clsx from 'clsx';

import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';

export default function PokemonDetailHabitat() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <PokemonDetailCard heading="Habitat">
      <p className={clsx(!pokemonSpecies.habitat && 'text-gray-400')}>
        {snakeCaseToTitleCase(pokemonSpecies.habitat || 'N/A')}
      </p>
    </PokemonDetailCard>
  );
}
