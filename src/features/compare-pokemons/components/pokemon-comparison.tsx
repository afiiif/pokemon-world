import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useId } from 'react';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { IoMdCloseCircle } from 'react-icons/io';

import { fetchPokemon } from '@/api/queries/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import { MAX_POKEMON_TO_COMPARE } from '../constants';
import usePokemonsParam from '../hooks/use-pokemons-param';
import Card from './card';
import MainSection from './main-section';
import MovesSection from './moves-section';
import PokemonComparisonCard from './pokemon-comparison-card';
import SearchPokemon from './search-pokemon';
import StatsAndAbilitySection from './stats-and-ability-section';

export default function PokemonComparison() {
  const { pathname, replace } = useRouter();

  const pokemons = usePokemonsParam();

  const results = useQueries({
    // @ts-ignore
    queries: pokemons.map((pokemonName) => ({
      queryKey: ['pokemon', pokemonName],
      queryFn: fetchPokemon,
    })),
  });

  useEffect(() => () => document.querySelector('#__next')!.classList.remove('hide-sidebar'), []);

  const idElmCardHeadContainer = useId();
  const idElmCardBodyContainer = useId();

  useEffect(() => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const elmCardHead = document.getElementById(idElmCardHeadContainer) as HTMLDivElement;
    // eslint-disable-next-line unicorn/prefer-query-selector
    const elmCardBody = document.getElementById(idElmCardBodyContainer) as HTMLDivElement;

    const onScroll: (event: HTMLElementEventMap['scroll']) => void = ({ target }) => {
      elmCardHead.scrollLeft = (target as HTMLDivElement).scrollLeft;
    };
    elmCardBody.addEventListener('scroll', onScroll);

    return () => {
      elmCardBody.removeEventListener('scroll', onScroll);
    };
  }, [idElmCardBodyContainer, idElmCardHeadContainer]);

  return (
    <>
      {pokemons.length > 4 && (
        <div className="relative hidden xl:block">
          <button
            type="button"
            onClick={() => document.querySelector('#__next')!.classList.toggle('hide-sidebar')}
            className="absolute right-0 -top-1 rounded-full border p-2 text-3xl"
            title="Toggle expand"
          >
            <HiOutlineArrowsExpand />
          </button>
        </div>
      )}

      <h1 className="h1 pb-5 xl:pr-16">{pokemons.map(snakeCaseToTitleCase).join(' vs ')}</h1>
      {pokemons.length < MAX_POKEMON_TO_COMPARE && (
        <div className="-mx-1.5 pb-5 lg:-mx-0.5">
          <SearchPokemon />
        </div>
      )}

      <div
        id={idElmCardHeadContainer}
        className="syncscroll sticky top-0 z-[1] -mx-3.5 mt-3 flex overflow-x-hidden pl-2 lg:top-20 lg:pl-3"
      >
        {results.map(({ data }, idx) => {
          const type = data?.pokemon_v2_pokemontypes[0].pokemon_v2_type!.name;
          return (
            <PokemonComparisonCard key={pokemons[idx]}>
              <h2
                className={`pokemon-elm overflow-hidden text-ellipsis whitespace-nowrap rounded-b-md border-b p-3 text-center text-lg font-bold bg-elm-${type}`}
              >
                {snakeCaseToTitleCase(data?.name || pokemons[idx])}
              </h2>
            </PokemonComparisonCard>
          );
        })}
      </div>

      <div
        id={idElmCardBodyContainer}
        className="syncscroll -mx-3.5 -mt-[3.75rem] overflow-x-auto overscroll-x-none pl-2 pb-5 lg:snap-x lg:snap-mandatory lg:pl-3"
      >
        <div className="flex">
          {pokemons.map((pokemonName) => (
            <PokemonComparisonCard key={pokemonName} className="relative flex flex-col">
              {pokemons.length > 2 && (
                <button
                  type="button"
                  onClick={() =>
                    replace(
                      `${pathname}?pokemons=${pokemons
                        .filter((pokemon) => pokemon !== pokemonName)
                        .join(',')}`,
                    )
                  }
                  className="absolute top-0.5 right-3 z-[2] p-0.5 text-3xl text-white"
                >
                  <IoMdCloseCircle />
                </button>
              )}
              <MainSection pokemonName={pokemonName} />
              <StatsAndAbilitySection pokemonName={pokemonName} />
            </PokemonComparisonCard>
          ))}
        </div>
        <div className="flex">
          {pokemons.map((pokemonName, idx) => (
            <PokemonComparisonCard key={pokemonName} className="relative flex flex-col">
              <MovesSection pokemonName={pokemonName} />
              {results[idx].data && (
                <Card>
                  <Link
                    href={`/pokemon/${pokemonName}`}
                    className="-m-2 block rounded-md p-2 text-center decoration-slate-400 hover:bg-slate-50 hover:font-semibold focus:bg-slate-50 focus:font-semibold dark:hover:bg-dark-light dark:focus:bg-dark-light"
                  >
                    Details →
                  </Link>
                </Card>
              )}
            </PokemonComparisonCard>
          ))}
        </div>
      </div>
    </>
  );
}
