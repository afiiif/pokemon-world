import Link from 'next/link';
import { BsArrow90DegDown, BsArrowRight } from 'react-icons/bs';

import PokemonImage from '@/components/commons/pokemon-image';
import { PokemonEvolution } from '@/types/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

type Props = {
  evolution: PokemonEvolution;
};

export default function PokemonEvolutionChain({ evolution }: Props) {
  return (
    <ul key={evolution.map((pokemon) => pokemon.id).join('')} className="pokemon-evolution">
      {evolution.map((pokemon, idx) => {
        const href = `/pokemon/${pokemon.name}`;
        return (
          <li
            key={pokemon.id}
            className={`pokemon-elm relative mb-1.5 flex items-center gap-3 rounded-md px-2.5 py-2 bg-elm-${pokemon.types[0]}`}
          >
            <Link href={href}>
              <PokemonImage
                idPokemon={pokemon.id}
                alt={pokemon.name}
                size={64}
                requestedSize={128}
              />
            </Link>
            <div>
              <Link href={href} className="text-lg font-medium">
                {snakeCaseToTitleCase(pokemon.name)}
              </Link>
              <div className="text-xs">Generation {pokemon.generation}</div>
            </div>
            {idx > 0 && (
              <div className="text-typography-light dark:text-typography-dark">
                <BsArrow90DegDown className="absolute -left-6 top-0 -rotate-90 text-xl md:hidden" />
                <BsArrowRight className="absolute -left-7 top-1/2 hidden -translate-y-1/2 text-3xl md:block" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
