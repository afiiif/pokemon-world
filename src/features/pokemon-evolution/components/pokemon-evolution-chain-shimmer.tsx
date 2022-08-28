import { BsArrow90DegDown, BsArrowRight } from 'react-icons/bs';

type Props = {
  n?: number;
};

export default function PokemonEvolutionChainShimmer({ n = 3 }: Props) {
  return (
    <ul className="pokemon-evolution">
      <li className="pokemon-elm relative mb-1.5 flex gap-3 rounded-md border bg-gray-200 px-2.5 py-2 dark:bg-dark-card">
        <div className="shimmer h-16 w-16 rounded-md" />
        <div>
          <div className="shimmer mt-3.5 h-4 w-32 rounded-md" />
          <div className="shimmer mt-2.5 h-3 w-20 rounded-md" />
        </div>
      </li>
      <li className="pokemon-elm relative mb-1.5 flex gap-3 rounded-md border bg-gray-200 px-2.5 py-2 dark:bg-dark-card">
        <div className="shimmer h-16 w-16 rounded-md" />
        <div>
          <div className="shimmer mt-3.5 h-4 w-32 rounded-md" />
          <div className="shimmer mt-2.5 h-3 w-20 rounded-md" />
        </div>
        <div className="text-typography-light dark:text-typography-dark">
          <BsArrow90DegDown className="absolute -left-6 top-0 -rotate-90 text-xl md:hidden" />
          <BsArrowRight className="absolute -left-7 top-1/2 hidden -translate-y-1/2 text-3xl md:block" />
        </div>
      </li>
      {n > 2 && (
        <li className="pokemon-elm relative mb-1.5 flex gap-3 rounded-md border bg-gray-200 px-2.5 py-2 dark:bg-dark-card">
          <div className="shimmer h-16 w-16 rounded-md" />
          <div>
            <div className="shimmer mt-3.5 h-4 w-32 rounded-md" />
            <div className="shimmer mt-2.5 h-3 w-20 rounded-md" />
          </div>
          <div className="text-typography-light dark:text-typography-dark">
            <BsArrow90DegDown className="absolute -left-6 top-0 -rotate-90 text-xl md:hidden" />
            <BsArrowRight className="absolute -left-7 top-1/2 hidden -translate-y-1/2 text-3xl md:block" />
          </div>
        </li>
      )}
    </ul>
  );
}
