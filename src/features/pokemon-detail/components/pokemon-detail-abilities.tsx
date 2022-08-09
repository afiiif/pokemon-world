import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailAbilities() {
  const { pokemon } = useCurrentPokemon();

  return (
    <section className="pokemon-detail-card">
      <h2>Abilities</h2>
      <ul className="list-disc space-y-2 pl-5">
        {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
          <li key={pokemon_v2_ability.name}>
            <h3 className="font-semibold">{snakeCaseToTitleCase(pokemon_v2_ability.name)}</h3>
            <p className="text-sm text-gray-500">
              {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
