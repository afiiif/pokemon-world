import { Fragment } from 'react';

import { useQueryPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { MAX_BASE_STATS, STATS_LABELS } from '@/constants/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import Card from './card';

type Props = {
  pokemonName: string;
};

export default function StatsAndAbilitySection({ pokemonName }: Props) {
  const pokemon = useQueryPokemon(pokemonName).data;
  const pokemonTypes = useQueryPokemonTypes(pokemonName).data!;

  if (!pokemon) {
    return (
      <>
        <Card heading="Base Stats">
          {STATS_LABELS.map((label) => (
            <Fragment key={label}>
              <div className="flex items-center justify-between text-sm">
                <div>{label}</div>
                <div className="shimmer h-3 w-6" />
              </div>
              <div className="shimmer mt-1 mb-2 h-2 w-full flex-1" />
            </Fragment>
          ))}
        </Card>
        <Card heading="Abilities">
          <div className="shimmer mt-2 h-2 w-2" />
          <div className="-mt-2.5 pl-4">
            <div className="shimmer h-3 w-16" />
            <div className="shimmer mt-2.5 h-3 w-full" />
            <div className="shimmer mt-2.5 h-3 w-4/5" />
          </div>
          <div className="shimmer mt-5 h-2 w-2" />
          <div className="-mt-2.5 mb-5 pl-4">
            <div className="shimmer h-3 w-16" />
            <div className="shimmer mt-2.5 h-3 w-full" />
            <div className="shimmer mt-2.5 h-3 w-4/5" />
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card heading="Base Stats">
        {STATS_LABELS.map((label, idx) => {
          const baseStat = pokemon.pokemon_v2_pokemonstats[idx].base_stat;
          return (
            <Fragment key={label}>
              <div className="flex justify-between text-sm">
                <div>{label}</div>
                <div className="font-semibold">{baseStat}</div>
              </div>
              <div className="mt-1 mb-2 h-2 w-full flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-dark-base">
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
      </Card>

      <Card heading="Abilities" className="flex-grow">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
            <li key={pokemon_v2_ability.name}>
              <div className="font-semibold">{snakeCaseToTitleCase(pokemon_v2_ability.name)}</div>
              {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0]?.short_effect && (
                <p className="text-gray-500 dark:text-slate-400">
                  {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
