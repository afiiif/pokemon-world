import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailForms() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <section className="mb-4 rounded-md bg-white p-3.5 shadow-md">
      <h2 className="pb-2 text-xl font-bold">Forms</h2>
      {pokemonSpecies.pokemon_v2_pokemons.map((pokemon) => {
        const href =
          pokemon.name === pokemonSpecies.name
            ? `/pokemon/${pokemonSpecies.name}`
            : `/pokemon/${pokemonSpecies.name}/${pokemon.name}`;

        return (
          <Link
            key={pokemon.name}
            href={href}
            className="flex items-center gap-1 py-1 hover:text-emerald-500"
          >
            <HiChevronRight />
            {snakeCaseToTitleCase(pokemon.name)}
            <span className="text-xs text-gray-400">
              {'• '}
              {pokemon.pokemon_v2_pokemontypes
                .map(({ pokemon_v2_type }) => pokemon_v2_type!.name)
                .join(', ')}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
