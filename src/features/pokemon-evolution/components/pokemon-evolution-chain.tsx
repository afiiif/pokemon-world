import clsx from 'clsx';
import Link from 'next/link';
import { BsArrow90DegDown, BsArrowRight } from 'react-icons/bs';

import PokemonImage from '@/components/commons/pokemon-image';
import { PokemonEvolution } from '@/types/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

const ITEM_IMAGE_URL = 'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/items';

type Props = {
  evolution: PokemonEvolution;
  className?: string;
};

export default function PokemonEvolutionChain({ evolution, className }: Props) {
  return (
    <ul
      key={evolution.map((pokemon) => pokemon.id).join('')}
      className={clsx('pokemon-evolution', className)}
    >
      {evolution.map((pokemon, idx) => {
        const href = `/pokemon/${pokemon.name}`;
        const hasTrigger = pokemon.trigger !== 'level-up' || !!pokemon.minLevel;
        return (
          <li
            key={pokemon.id}
            className={`pokemon-elm relative mb-1.5 flex items-center gap-2 rounded-md px-2.5 py-2 bg-elm-${pokemon.types[0]}`}
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
              <Link href={href} className="text-lg font-medium hover:underline">
                {snakeCaseToTitleCase(pokemon.name)}
              </Link>
              <div className="text-xs opacity-70">Generation {pokemon.generation}</div>
            </div>
            {idx > 0 && (
              <>
                <div className="text-typography-light dark:text-typography-dark">
                  <BsArrow90DegDown
                    className={clsx(
                      'absolute -left-6 -rotate-90 text-xl md:hidden',
                      hasTrigger ? 'top-10' : 'top-0',
                    )}
                  />
                  <BsArrowRight className="absolute -left-7 top-1/2 hidden -translate-y-1/2 text-3xl md:block" />
                </div>

                <div className="absolute right-full top-0 w-8 pr-1.5 md:top-5 md:-translate-x-5">
                  {!!pokemon.minLevel && (
                    <div className="rounded bg-slate-800 px-1.5 py-1 text-xs text-white dark:bg-white dark:text-slate-800">
                      Lv
                      <br />
                      {pokemon.minLevel}
                    </div>
                  )}
                  {pokemon.item && (
                    <a
                      href={`https://pokemondb.net/item/${pokemon.item}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${ITEM_IMAGE_URL}/${pokemon.item}.png`}
                        alt={pokemon.item}
                        title={snakeCaseToTitleCase(pokemon.item)}
                        className="mt-0.5 -ml-1 min-w-[32px] md:mt-1 md:-ml-0.5 md:min-w-[28px]"
                        width={32}
                      />
                    </a>
                  )}
                  {pokemon.trigger !== 'level-up' && !pokemon.item && (
                    <button
                      type="button"
                      className="w-full py-1.5 text-lg md:py-1"
                      title={snakeCaseToTitleCase(pokemon.trigger!)}
                      // eslint-disable-next-line no-alert
                      onClick={() => alert(snakeCaseToTitleCase(pokemon.trigger!))}
                    >
                      ℹ️
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
