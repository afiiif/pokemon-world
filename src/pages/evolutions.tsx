import { dehydrate, DehydratedState, useQueries } from '@tanstack/react-query';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useIntersection } from 'react-power-ups';

import { fetchPokemonEvolution } from '@/api/queries/pokemon-evolution';
import { fetchPokemonGenAndTypes } from '@/api/queries/pokemon-gen-and-types';
import DefaultOgImage from '@/components/headless/seo/default-og-image';
import getQueryClient from '@/config/react-query';
import Filter from '@/features/pokemon-evolution/components/filter';
import PokemonEvolutionChain from '@/features/pokemon-evolution/components/pokemon-evolution-chain';
import PokemonEvolutionChainShimmer from '@/features/pokemon-evolution/components/pokemon-evolution-chain-shimmer';

import { getEvolutions, PokemonEvolutionFilter } from './api/pokemons/evolution';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const INITIAL_FILTER = { generationId: 0, type: '' };

export async function getStaticProps(): Promise<Result> {
  const queryClient = getQueryClient();
  await queryClient.fetchQuery(['pokemon-g&t'], fetchPokemonGenAndTypes);
  await queryClient.fetchQuery(['pokemon-evolution', INITIAL_FILTER, 0], () => getEvolutions({}));

  // https://github.com/tannerlinsley/react-query/issues/1458
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState,
    },
  };
}

export default function EvolutionsPage() {
  const [filter, setFilter] = useState<PokemonEvolutionFilter>(INITIAL_FILTER);
  const [page, setPage] = useState(0);

  const results = useQueries({
    // @ts-ignore
    queries: [...Array(page + 1).keys()].map((idx) => ({
      queryKey: ['pokemon-evolution', filter, idx],
      queryFn: fetchPokemonEvolution,
    })),
  });

  const loadMoreRef = useIntersection({
    rootMargin: '560px',
    onEnter: () => results[page].data!.length === 25 && setPage((prev) => prev + 1),
    enabled: !results[page].isLoading,
  });

  return (
    <>
      <NextSeo
        title="Pokémon Evolutions"
        description="Explore Pokemon evolution chain easily. Get an insight into what your favorite Pokemon would evolve into!"
      />
      <DefaultOgImage />

      <h1 className="h1 pb-2">Pokémon Evolutions</h1>

      <Filter filter={filter} setFilter={setFilter} />
      <hr className="-mx-6 mb-8 hidden lg:block" />

      {results.map(({ data }) =>
        data?.map((evolution) => (
          <PokemonEvolutionChain
            key={evolution.map((pokemon) => pokemon.id).join('')}
            evolution={evolution}
          />
        )),
      )}

      {results[page].isLoading && (
        <>
          <PokemonEvolutionChainShimmer />
          <PokemonEvolutionChainShimmer />
          <PokemonEvolutionChainShimmer n={2} />
        </>
      )}

      <div ref={loadMoreRef} />
    </>
  );
}
