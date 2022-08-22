import Image from 'next/future/image';

import { snakeCaseToTitleCase } from '@/utils/string';

type Props = {
  rank: {
    n: number;
    type: string[];
  }[];
};

export default function MultiType({ rank }: Props) {
  const [rank1, rank2, rank3] = rank;

  return (
    <ol className="flex items-end gap-3.5 pt-4">
      <li>
        <div className="relative flex h-28 w-28">
          <div
            className={`flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank1.type[0]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank1.type[0]}.svg`}
              alt={rank1.type[0]}
              width={(72 * 2) / 3}
              height={(72 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
          <div
            className={`absolute right-0 bottom-0 flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank1.type[1]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank1.type[1]}.svg`}
              alt={rank1.type[1]}
              width={(72 * 2) / 3}
              height={(72 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
        </div>
        <div className="pt-2 text-center">
          <div className="text-sm font-medium">
            {snakeCaseToTitleCase(rank1.type[0])}/{snakeCaseToTitleCase(rank1.type[1])}
          </div>
          <div className="text-xs text-gray-400">{rank1.n} Pokémons</div>
        </div>
      </li>
      <li>
        <div className="relative flex h-24 w-24">
          <div
            className={`flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank2.type[0]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank2.type[0]}.svg`}
              alt={rank2.type[0]}
              width={(60 * 2) / 3}
              height={(60 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
          <div
            className={`absolute right-0 bottom-0 flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank2.type[1]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank2.type[1]}.svg`}
              alt={rank2.type[1]}
              width={(60 * 2) / 3}
              height={(60 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
        </div>
        <div className="pt-2 text-center">
          <div className="text-sm font-medium">
            {snakeCaseToTitleCase(rank2.type[0])}/{snakeCaseToTitleCase(rank2.type[1])}
          </div>
          <div className="text-xs text-gray-400">{rank2.n} Pokémons</div>
        </div>
      </li>
      <li>
        <div className="relative flex h-20 w-20">
          <div
            className={`flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank3.type[0]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank3.type[0]}.svg`}
              alt={rank3.type[0]}
              width={(48 * 2) / 3}
              height={(48 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
          <div
            className={`absolute right-0 bottom-0 flex h-2/3 w-2/3 items-center justify-center rounded-full bg-elm-${rank3.type[1]}`}
          >
            <Image
              src={`/icons/pokemon-types/${rank3.type[1]}.svg`}
              alt={rank3.type[1]}
              width={(48 * 2) / 3}
              height={(48 * 2) / 3}
              quality={25}
              className="opacity-50"
            />
          </div>
        </div>
        <div className="pt-2 text-center">
          <div className="text-sm font-medium">
            {snakeCaseToTitleCase(rank3.type[0])}/{snakeCaseToTitleCase(rank3.type[1])}
          </div>
          <div className="text-xs text-gray-400">{rank3.n} Pokémons</div>
        </div>
      </li>
    </ol>
  );
}
