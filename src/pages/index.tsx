import { dehydrate, DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useIntersection } from 'react-power-ups';

import { fetchPokemonGenAndTypes } from '@/api/queries/pokemon-gen-and-types';
import { fetchPokemons, QueryPokemonFilter, useInfQueryPokemons } from '@/api/queries/pokemons';
import getQueryClient from '@/config/react-query';
import { TYPE } from '@/constants/pokemon';
import PokemonCard from '@/features/pokemon-list/components/pokemon-card';
import PokemonCardsShimmer from '@/features/pokemon-list/components/pokemon-cards-shimmer';
import PokemonListFilter from '@/features/pokemon-list/components/pokemon-list-filter';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const INITIAL_FILTER = { name: '', generationId: 0, typeId: 0 };

const SEO_DESCRIPTION =
  process.env.NEXT_PUBLIC_SEO_HOMEPAGE_DESCRIPTION ||
  process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION ||
  'Pokémon Awesome';

export async function getStaticProps(): Promise<Result> {
  const queryClient = getQueryClient();
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

  const pokemons = data!.pages.flat();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <>
      <NextSeo
        description={SEO_DESCRIPTION}
        openGraph={{
          images: [
            {
              url: `${
                process.env.NEXT_PUBLIC_BASE_URL || ''
              }/images/pokemon-awesome-thumbnail-1200x630.jpg`,
              width: 1200,
              height: 630,
              alt: 'Pokemon Awesome',
              type: 'image/jpeg',
            },
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/pokemon-awesome-thumbnail.jpg`,
              width: 2560,
              height: 1280,
              alt: 'Pokemon Awesome',
              type: 'image/jpeg',
            },
          ],
        }}
      />

      <div className="sticky-section">
        <PokemonListFilter filter={filter} setFilter={setFilter} />
      </div>
      <hr className="-mx-6 mb-8 hidden lg:block" />

      {isPreviousData ? (
        <div className="relative -top-4 text-center">⏳ Loading...</div>
      ) : (
        !!filter.typeId && (
          <div className="-mt-2 mb-5 italic">
            NOTE:&nbsp; If you see Pokémons{' '}
            <b>without {TYPE[filter.typeId as keyof typeof TYPE]} type</b>, it was because those
            Pokémons <b>have another form</b> with {TYPE[filter.typeId as keyof typeof TYPE]} type.
          </div>
        )
      )}
      <div className={clsx('pokemon-card-container', isPreviousData && 'opacity-60')}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
        {!isFetching && pokemons.length === 0 && 'No result'}
        {isFetchingNextPage && <PokemonCardsShimmer />}

        {/* Add 2 empty div to enforce 3 columns layout even when just displaying 1 card */}
        <div />
        <div />
      </div>
      <div ref={loadMoreRef} />
    </>
  );
}
