import { useRouter } from 'next/router';

import { useQueryPokemon } from '@/api/queries/pokemon';
import { useQueryPokemonSpecies } from '@/api/queries/pokemon-species';

export default function useCurrentPokemon() {
  const { query } = useRouter();
  const [pokemonSpeciesName, pokemonNameSlug] = query.slug as [string, string?];

  const pokemonSpecies = useQueryPokemonSpecies(pokemonSpeciesName).data!;
  const pokemonName = pokemonNameSlug || pokemonSpecies.pokemon_v2_pokemons[0].name;
  const pokemon = useQueryPokemon(pokemonName).data!;

  return {
    pokemonSpecies,
    pokemon,
  };
}
