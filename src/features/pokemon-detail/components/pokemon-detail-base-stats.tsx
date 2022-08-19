import { useQueryPokemonTypes } from '@/api/queries/pokemon';
import { MAX_BASE_STATS, STATS_LABELS } from '@/constants/pokemon';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';

export default function PokemonDetailBaseStats() {
  const { pokemon } = useCurrentPokemon();
  const pokemonTypes = useQueryPokemonTypes(pokemon.name).data!;

  return (
    <PokemonDetailCard heading="Base Stats">
      <div className="space-y-1 text-sm">
        {STATS_LABELS.map((label, idx) => {
          const baseStat = pokemon.pokemon_v2_pokemonstats[idx].base_stat;
          return (
            <div key={label} className="flex items-center">
              <div className="w-24">{label}</div>
              <div className="mr-2.5 w-7 text-right font-semibold">{baseStat}</div>
              <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-dark-base">
                <div
                  className={`h-full bg-elm-${pokemonTypes[0]} transition-all`}
                  style={{
                    width: `${(baseStat / MAX_BASE_STATS) * 100}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PokemonDetailCard>
  );
}
