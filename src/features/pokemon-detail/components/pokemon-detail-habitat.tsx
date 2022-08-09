import clsx from 'clsx';

import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailHabitat() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <section className="pokemon-detail-card">
      <h2>Habitat</h2>
      <p className={clsx(!pokemonSpecies.habitat && 'text-gray-400')}>
        {snakeCaseToTitleCase(pokemonSpecies.habitat || 'N/A')}
      </p>
    </section>
  );
}
