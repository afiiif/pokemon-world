import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { useQueryPokemonGenAndTypes } from '@/api/queries/pokemon-gen-and-types';
import { PokemonEvolutionFilter } from '@/pages/api/pokemons/evolution';

import { getFilterParam, getNewRoute } from '../utils/url';

type Props = {
  filter: PokemonEvolutionFilter;
  setFilter: Dispatch<SetStateAction<PokemonEvolutionFilter>>;
};

export default function Filter({ filter, setFilter }: Props) {
  const { data } = useQueryPokemonGenAndTypes();
  const { replace, asPath } = useRouter();

  useEffect(() => {
    const { gen, type } = getFilterParam();
    if (gen || type) {
      setFilter({
        generationId: Number(gen),
        type: type || '',
      });
      replace(asPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sticky-section mt-0 border-b bg-slate-50/80 backdrop-blur dark:bg-dark-base/70 lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent">
      <select
        value={filter.generationId}
        onChange={({ target }) => {
          setFilter((prev) => ({ ...prev, generationId: Number(target.value) }));
          replace(getNewRoute({ gen: target.value }));
        }}
        className="mx-px h-[38px] flex-grow rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light lg:flex-grow-0"
      >
        <option value="0">All generations</option>
        {data!.generations.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <select
        value={filter.type}
        onChange={({ target }) => {
          setFilter((prev) => ({ ...prev, type: target.value }));
          replace(getNewRoute({ type: target.value }));
        }}
        className="mx-px h-[38px] flex-grow rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light lg:flex-grow-0"
      >
        <option value="0">All types</option>
        {data!.types.map(({ id, name }) => (
          <option key={id} value={name.toLowerCase()}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
