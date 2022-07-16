import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useThrottleFn } from 'react-power-ups';

import { useQueryPokemonGenAndTypes } from '@/api/queries/pokemon-gen-and-types';
import { QueryPokemonFilter } from '@/api/queries/pokemons';

type Props = {
  filter: QueryPokemonFilter;
  setFilter: Dispatch<SetStateAction<QueryPokemonFilter>>;
};

export default function PokemonListFilter({ filter, setFilter }: Props) {
  const { data } = useQueryPokemonGenAndTypes();

  const [setKeyword] = useThrottleFn<[ChangeEvent<HTMLInputElement>]>(
    ({ target }) => setFilter((prev) => ({ ...prev, name: target.value.trim() })),
    600,
  );

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search pokémon"
        className="flex-1 rounded-md bg-slate-200 px-3 lg:flex-none"
        onChange={setKeyword}
      />

      <div className="group">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border text-2xl lg:hidden"
          title="Filter"
          aria-label="Filter"
        >
          ⚙️
        </button>
        <button
          type="button"
          className="absolute hidden h-10 w-10 -translate-y-full items-center justify-center rounded-md border text-2xl group-focus-within:flex lg:!hidden"
          onClick={() => (document.activeElement as HTMLElement)?.blur()}
          title="Filter"
          aria-label="Filter"
        >
          ⚙️
        </button>

        <div className="absolute inset-x-0 -top-2.5 -z-10 mt-1 grid grid-cols-2 gap-2.5 border-y py-3 px-3.5 transition-all group-focus-within:top-14 group-focus-within:bg-slate-50/80 group-focus-within:backdrop-blur lg:relative lg:!inset-auto lg:z-auto lg:m-0 lg:flex lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
          <select
            value={filter.generationId}
            onChange={({ target }) =>
              setFilter((prev) => ({ ...prev, generationId: Number(target.value) }))
            }
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200"
          >
            <option value="0">All generations</option>
            {data!.generations.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={filter.typeId}
            onChange={({ target }) =>
              setFilter((prev) => ({ ...prev, typeId: Number(target.value) }))
            }
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200"
          >
            <option value="0">All types</option>
            {data!.types.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-[60px] bg-slate-50/80 backdrop-blur lg:hidden" />
      </div>
    </>
  );
}
