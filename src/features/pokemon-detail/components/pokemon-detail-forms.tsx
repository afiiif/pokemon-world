import Link from 'next/link';

import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailForms() {
  const { pokemonSpecies } = useCurrentPokemon();
  const hasForms = pokemonSpecies.pokemon_v2_pokemons.length > 1;

  if (!hasForms) {
    return null;
  }

  return (
    <section className="pokemon-detail-card">
      <h2>Forms</h2>
      <ul className="list-disc pl-5">
        {pokemonSpecies.pokemon_v2_pokemons.map((pokemon) => {
          const href =
            pokemon.name === pokemonSpecies.name
              ? `/pokemon/${pokemonSpecies.name}`
              : `/pokemon/${pokemonSpecies.name}/${pokemon.name}`;

          return (
            <li key={pokemon.name}>
              <Link
                href={href}
                className="flex items-center gap-1 py-1 hover:text-emerald-500"
                replace
                scroll={false}
              >
                {snakeCaseToTitleCase(pokemon.name)}
                <span className="text-xs text-gray-400">
                  {'• '}
                  {pokemon.pokemon_v2_pokemontypes
                    .map(({ pokemon_v2_type }) => pokemon_v2_type!.name)
                    .join(', ')}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
