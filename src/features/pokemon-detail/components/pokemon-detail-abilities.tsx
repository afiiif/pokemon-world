import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';

export default function PokemonDetailAbilities() {
  const { pokemon } = useCurrentPokemon();

  return (
    <PokemonDetailCard heading="Abilities">
      <ul className="list-disc space-y-2 pl-5">
        {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
          <li key={pokemon_v2_ability.name}>
            <div className="font-semibold">{snakeCaseToTitleCase(pokemon_v2_ability.name)}</div>
            {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0]?.short_effect && (
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}
              </p>
            )}
          </li>
        ))}
      </ul>
    </PokemonDetailCard>
  );
}
