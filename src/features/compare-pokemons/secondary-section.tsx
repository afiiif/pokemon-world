import { Fragment } from 'react';

import { useQueryPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { MAX_BASE_STATS, STATS_LABELS, TYPE } from '@/constants/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

type Props = {
  pokemonName: string;
};

export default function SecondarySection({ pokemonName }: Props) {
  const pokemon = useQueryPokemon(pokemonName).data;
  const pokemonTypes = useQueryPokemonTypes(pokemonName).data!;

  if (!pokemon) {
    return (
      <>
        <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
          <h3 className="pb-2 font-bold">Base Stats</h3>
          {STATS_LABELS.map((label) => (
            <Fragment key={label}>
              <div className="flex items-center justify-between text-sm">
                <div>{label}</div>
                <div className="h-3 w-6 animate-pulse rounded-full bg-white/10 invert" />
              </div>
              <div className="mt-1 mb-2 h-2 w-full flex-1 animate-pulse overflow-hidden rounded-full bg-slate-200" />
            </Fragment>
          ))}
        </section>
        <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
          <h3 className="pb-2 font-bold">Abilities</h3>
          <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
          <div className="mt-2.5 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
          <div className="mt-2.5 mb-10 h-3 w-4/5 animate-pulse rounded-full bg-white/10 invert" />
        </section>
        <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
          <h3 className="pb-2 font-bold">Moves</h3>
          <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
          <div className="mt-2.5 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
          <div className="mt-2.5 mb-10 h-3 w-4/5 animate-pulse rounded-full bg-white/10 invert" />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
        <h3 className="pb-2 font-bold">Base Stats</h3>
        {STATS_LABELS.map((label, idx) => {
          const baseStat = pokemon.pokemon_v2_pokemonstats[idx].base_stat;
          return (
            <Fragment key={label}>
              <div className="flex justify-between text-sm">
                <div>{label}</div>
                <div className="font-semibold">{baseStat}</div>
              </div>
              <div className="mt-1 mb-2 h-2 w-full flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full bg-elm-${pokemonTypes[0]} transition-all`}
                  style={{
                    width: `${(baseStat / MAX_BASE_STATS) * 100}%`,
                  }}
                />
              </div>
            </Fragment>
          );
        })}
      </section>

      <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
        <h3 className="pb-2 font-bold">Abilities</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
            <li key={pokemon_v2_ability.name}>
              <h3 className="font-semibold">{snakeCaseToTitleCase(pokemon_v2_ability.name)}</h3>
              <p className="text-gray-500">
                {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
        <h3 className="pb-2 font-bold">Moves</h3>
        <div className="relative max-h-[26rem] overflow-y-auto">
          <table className="w-full border-separate border-spacing-0 border-l text-sm">
            <thead className="sticky top-0 bg-white text-left">
              <tr>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Name</th>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Type</th>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Power</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.pokemon_v2_pokemonmoves.map(({ pokemon_v2_move }) => {
                const moveType = TYPE[pokemon_v2_move.type_id as keyof typeof TYPE];
                return (
                  <tr key={pokemon_v2_move.name} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap border-b border-r px-2 py-1">
                      {snakeCaseToTitleCase(pokemon_v2_move.name)}
                    </td>
                    <td className="flex items-center gap-1.5 border-b border-r px-2 py-1 capitalize">
                      <div className={`h-2.5 w-2.5 rounded-full bg-elm-${moveType}`} />
                      {moveType}
                    </td>
                    <td className="border-b border-r px-2 py-1">{pokemon_v2_move.power || '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
