import dynamic from 'next/dynamic';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';

import { usePokemonStatistics } from '@/api/queries/pokemon-statistics';
import Nav from '@/features/statistics/components/nav';
import MultiType from '@/features/statistics/components/pokemon-type-rank/multi-type';
import SingleType from '@/features/statistics/components/pokemon-type-rank/single-type';
import { snakeCaseToTitleCase } from '@/utils/string';
import rank from '~/generated/statistics/types-rank.json';

const PokemonTypeRelation = dynamic(
  () => import('@/features/statistics/components/pokemon-type-relation'),
  { ssr: false, loading: () => <div className="h-[100vw] max-h-[42rem]" /> },
);

export default function StatisticsTypesPage() {
  usePokemonStatistics();

  return (
    <>
      <NextSeo
        title="Statistics of Pokémon Types"
        description="See how pokemon types are distributed. What is the most common and the rarest pokemon types?"
        openGraph={{
          images: [
            {
              url: `${
                process.env.NEXT_PUBLIC_BASE_URL || ''
              }/images/pokemon-statistics-thumbnail-1200x630.jpg`,
              width: 1200,
              height: 630,
              alt: 'Pokemon Statistics',
              type: 'image/jpeg',
            },
          ],
        }}
      />

      <h1 className="h1 pb-6">Statistics</h1>

      <Nav />

      <section>
        <h2 className="pt-9 pb-4 text-2xl font-bold">Pokémon Type Relation</h2>
        <PokemonTypeRelation />
      </section>

      <section>
        <h2 className="mt-8 border-t pt-5 pb-6 text-2xl font-bold md:mt-11 md:pt-8">
          Most-Occurrences Type
        </h2>
        <div className="md:flex md:gap-20">
          <div className="pb-6 md:pb-0">
            <h3 className="text-lg font-medium">Single Type</h3>
            <SingleType rank={rank.largestSingleType} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Pair Type</h3>
            <MultiType rank={rank.largestMultiType} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mt-8 border-t pt-5 pb-6 text-2xl font-bold md:mt-11 md:pt-8">
          Least-Occurrences Type
        </h2>
        <div className="md:flex md:gap-20">
          <div className="pb-6 md:pb-0">
            <h3 className="text-lg font-medium">Single Type</h3>
            <SingleType rank={rank.smallestSingleType} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Pair Type</h3>
            <p className="text-gray-400">Too many pair type which has only one pokémon 😅</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mt-8 border-t pt-5 pb-6 text-2xl font-bold md:mt-11 md:pt-8">
          Zero-Occurrences Pair Type
        </h2>
        <ul className="flex flex-wrap pb-10">
          {rank.noOccurenceMultiType.map(([type1, type2]) => (
            <li key={`${type1},${type2}`} className="pb-7">
              <div className="relative mx-5 flex h-20 w-20">
                <div
                  className={`flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${type1}`}
                >
                  <Image
                    src={`/icons/pokemon-types/${type1}.svg`}
                    alt={type1}
                    width={(48 * 2) / 3}
                    height={(48 * 2) / 3}
                    quality={25}
                    className="opacity-50"
                  />
                </div>
                <div
                  className={`absolute right-0 bottom-0 flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${type2}`}
                >
                  <Image
                    src={`/icons/pokemon-types/${type2}.svg`}
                    alt={type2}
                    width={(48 * 2) / 3}
                    height={(48 * 2) / 3}
                    quality={25}
                    className="opacity-50"
                  />
                </div>
              </div>
              <div className="pt-2 text-center">
                <div className="text-sm font-medium">
                  {snakeCaseToTitleCase(type1)}/{snakeCaseToTitleCase(type2)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
