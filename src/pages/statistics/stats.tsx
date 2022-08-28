import { NextSeo } from 'next-seo';

import Nav from '@/features/statistics/components/nav';

export default function StatisticsStatsPage() {
  return (
    <>
      <NextSeo title="Statistics of Pokemon Stats" />
      <h1 className="h1 pb-6">Statistics</h1>

      <Nav />

      <div className="pt-10 pb-4 text-2xl text-rose-500">
        🔒 This page only available for premium users
      </div>
      <div className="pb-16 text-gray-400">
        Just kidding. Actually it&apos;s not developed yet 😅
      </div>
    </>
  );
}
