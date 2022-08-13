import clsx from 'clsx';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useQueries } from 'react-query';

import { fetchPokemon } from '@/api/queries/pokemon';
import MainSection from '@/features/compare-pokemons/main-section';
import SecondarySection from '@/features/compare-pokemons/secondary-section';
import { snakeCaseToTitleCase } from '@/utils/string';

const MAX_POKEMON_TO_COMPARE = 6;

export default function ComparePokemonsPage() {
  const { query } = useRouter();
  const pokemonsUnlimited = (query.pokemons as string | undefined)?.split(',');
  const pokemons = pokemonsUnlimited?.slice(0, MAX_POKEMON_TO_COMPARE) || [];

  const results = useQueries({
    // @ts-ignore
    queries: pokemons.map((pokemonName) => ({
      queryKey: ['pokemon', pokemonName],
      queryFn: fetchPokemon,
    })),
  });

  if (pokemons.length > 0) {
    return (
      <>
        <Script src="http://asvd.github.io/syncscroll/syncscroll.js" />

        <div
          // @ts-ignore name property for syncscroll.js
          name="pokemons-syncscroll"
          className="syncscroll sticky top-0 z-10 -mx-3.5 mt-3 flex overflow-x-hidden pl-2 lg:top-20 lg:pl-3"
        >
          {results.map(({ data }, idx) => {
            const type = data?.pokemon_v2_pokemontypes[0].pokemon_v2_type!.name;
            return (
              <div
                key={pokemons[idx]}
                className={clsx(
                  'min-w-[15rem] flex-none pr-2 lg:snap-start lg:pr-3',
                  pokemons.length === 1 && 'w-full sm:w-1/2',
                  pokemons.length === 2 && 'w-1/2',
                  pokemons.length === 3 && 'w-1/3',
                  pokemons.length > 3 && 'w-1/4',
                )}
              >
                <h2
                  className={`pokemon-elm rounded-b-md border-b p-3 text-center text-lg font-bold bg-elm-${type}`}
                >
                  {snakeCaseToTitleCase(data?.name || pokemons[idx])}
                </h2>
              </div>
            );
          })}
        </div>

        <div
          // @ts-ignore name property for syncscroll.js
          name="pokemons-syncscroll"
          className="syncscroll -mx-3.5 -mt-[3.75rem] flex overflow-x-auto overscroll-x-none pl-2 pb-5 lg:snap-x lg:snap-mandatory lg:pl-3"
        >
          {pokemons.map((pokemonName) => (
            <section
              key={pokemonName}
              className={clsx(
                'min-w-[15rem] flex-none pr-2 lg:snap-start lg:pr-3',
                pokemons.length === 1 && 'w-full sm:w-1/2',
                pokemons.length === 2 && 'w-1/2',
                pokemons.length === 3 && 'w-1/3',
                pokemons.length > 3 && 'w-1/4',
              )}
            >
              <MainSection pokemonName={pokemonName} />
              <SecondarySection pokemonName={pokemonName} />
            </section>
          ))}
          {pokemons.length === 1 && (
            <section className="hidden flex-1 border p-3 sm:block">?</section>
          )}
        </div>

        {pokemons.length < MAX_POKEMON_TO_COMPARE && (
          <div className="-mx-1.5 rounded-md bg-white p-3.5 shadow-md lg:-mx-0.5">
            🚧 Add Pokemon to Compare
          </div>
        )}
      </>
    );
  }

  return <div>🚧 Compare Pokemon Page</div>;
}
