import { Fragment } from 'react';

import { useQueryPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { MAX_BASE_STATS, STATS_LABELS } from '@/constants/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

type Props = {
  pokemonName: string;
};

export default function StatsAndAbilitySection({ pokemonName }: Props) {
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
              <div className="mt-1 mb-2 h-2 w-full flex-1 animate-pulse overflow-hidden rounded-full bg-white/10 invert" />
            </Fragment>
          ))}
        </section>
        <section className="mt-2.5 rounded-md bg-white p-3.5 shadow-md">
          <h3 className="pb-2 font-bold">Abilities</h3>
          <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-white/10 invert" />
          <div className="-mt-2.5 pl-4">
            <div className="h-3 w-16 animate-pulse rounded-full bg-white/10 invert" />
            <div className="mt-2.5 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
            <div className="mt-2.5 h-3 w-4/5 animate-pulse rounded-full bg-white/10 invert" />
          </div>
          <div className="mt-5 h-2 w-2 animate-pulse rounded-full bg-white/10 invert" />
          <div className="-mt-2.5 mb-5 pl-4">
            <div className="h-3 w-16 animate-pulse rounded-full bg-white/10 invert" />
            <div className="mt-2.5 h-3 w-full animate-pulse rounded-full bg-white/10 invert" />
            <div className="mt-2.5 h-3 w-4/5 animate-pulse rounded-full bg-white/10 invert" />
          </div>
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

      <section className="mt-2.5 flex-grow rounded-md bg-white p-3.5 shadow-md">
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
    </>
  );
}
