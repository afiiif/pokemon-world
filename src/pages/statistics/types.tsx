import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { usePokemonStatistics } from '@/api/queries/pokemon-statistics';
import Nav from '@/features/statistics/components/nav';

const PokemonTypeRelation = dynamic(
  () => import('@/features/statistics/components/pokemon-type-relation'),
  { ssr: false },
);

export default function StatisticsTypesPage() {
  usePokemonStatistics();

  return (
    <>
      <NextSeo title="Statistics of Pokemon Types" />
      <h1 className="pb-6 text-3xl font-bold">Statistics</h1>

      <Nav />

      <section>
        <h2 className="pt-9 pb-4 text-2xl font-bold">Pokemon Type Relation</h2>
        <PokemonTypeRelation />
      </section>

      <section>
        <h2 className="pt-9 pb-4 text-2xl font-bold">Most Occurrences</h2>
        <div className="pt-2 pb-16">🚧 Work in progress...</div>
      </section>

      <section>
        <h2 className="pt-9 pb-4 text-2xl font-bold">Least Occurrences</h2>
        <div className="pt-2 pb-16">🚧 Work in progress...</div>
      </section>
    </>
  );
}
