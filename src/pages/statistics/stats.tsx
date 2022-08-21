import { NextSeo } from 'next-seo';

import Nav from '@/features/statistics/components/nav';

export default function StatisticsStatsPage() {
  return (
    <>
      <NextSeo title="Statistics of Pokemon Stats" />
      <h1 className="pb-6 text-3xl font-bold">Statistics</h1>

      <Nav />

      <div className="py-10">🚧 Work in progress...</div>
    </>
  );
}
