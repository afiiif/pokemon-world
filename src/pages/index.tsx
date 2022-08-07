import clsx from 'clsx';
import { GetStaticPropsResult } from 'next';
import { useEffect, useState } from 'react';
import { useIntersection } from 'react-power-ups';
import { dehydrate, DehydratedState } from 'react-query';

import { fetchPokemonGenAndTypes } from '@/api/queries/pokemon-gen-and-types';
import { fetchPokemons, QueryPokemonFilter, useInfQueryPokemons } from '@/api/queries/pokemons';
import queryClient from '@/config/react-query';
import PokemonCard from '@/features/pokemon-list/components/pokemon-card';
import PokemonCardsShimmer from '@/features/pokemon-list/components/pokemon-cards-shimmer';
import PokemonListFilter from '@/features/pokemon-list/components/pokemon-list-filter';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const INITIAL_FILTER = { name: '', generationId: 0, typeId: 0 };

export async function getStaticProps(): Promise<Result> {
  await queryClient.fetchInfiniteQuery(['pokemons', INITIAL_FILTER], fetchPokemons);
  await queryClient.fetchQuery(['pokemon-g&t'], fetchPokemonGenAndTypes);

  // https://github.com/tannerlinsley/react-query/issues/1458
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState,
    },
  };
}

export default function PokemonListPage() {
  const [filter, setFilter] = useState<QueryPokemonFilter>(INITIAL_FILTER);
  const { data, isFetching, isFetchingNextPage, isPreviousData, fetchNextPage } =
    useInfQueryPokemons(filter);

  const loadMoreRef = useIntersection({
    rootMargin: '560px',
    onEnter: () => fetchNextPage(),
    enabled: !isFetching,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <>
      <div className="sticky-section">
        <PokemonListFilter filter={filter} setFilter={setFilter} />
      </div>
      <hr className="-mx-6 mb-8 hidden lg:block" />

      {isPreviousData && <div className="relative -top-4 text-center">⏳ Loading...</div>}
      <div className={clsx('pokemon-card-container', isPreviousData && 'opacity-60')}>
        {data!.pages.map((pokemons) =>
          pokemons.map((pokemon) => <PokemonCard key={pokemon.id} {...pokemon} />),
        )}
        {isFetchingNextPage && <PokemonCardsShimmer />}

        {/* Add 2 empty div to enforce 3 columns layout even when just displaying 1 card */}
        <div />
        <div />
      </div>
      <div ref={loadMoreRef} />
    </>
  );
}
