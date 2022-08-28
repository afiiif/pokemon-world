import clsx from 'clsx';
import { useToggle } from 'react-power-ups';

import PokemonEvolutionChain from '@/features/pokemon-evolution/components/pokemon-evolution-chain';
import { PokemonEvolution } from '@/types/pokemon';

import PokemonDetailCard from './pokemon-detail-card';

type Props = {
  evolutions: PokemonEvolution[];
  type: string;
};

export default function PokemonDetailEvolution({ evolutions, type }: Props) {
  const [isExpanded, toggleExpand] = useToggle();

  const hasEvolution = evolutions[0].length > 1;

  if (!hasEvolution) {
    return null;
  }

  const [evolution1, evolution2, ...restEvolutions] = evolutions;

  return (
    <div className={`pokemon-detail-card-container block bg-elm-${type}`}>
      <PokemonDetailCard heading="Evolution Chain">
        <div className="-mt-3" />

        <PokemonEvolutionChain evolution={evolution1} className="mb-0 mt-5" />
        {evolution2 && <PokemonEvolutionChain evolution={evolution2} className="mb-0 mt-5" />}

        {restEvolutions.map((evolution) => (
          <PokemonEvolutionChain
            key={evolution.map((item) => item.id).join('')}
            evolution={evolution}
            className={clsx('mb-0 mt-5', !isExpanded && 'hidden')}
          />
        ))}

        {restEvolutions.length > 0 && (
          <button type="button" onClick={toggleExpand} className="pt-3 hover:underline">
            {isExpanded ? 'See less...' : 'See more...'}
          </button>
        )}
      </PokemonDetailCard>
      <div className="md:-mb-4 lg:hidden" />
    </div>
  );
}
