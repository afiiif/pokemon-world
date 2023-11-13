import { useEffect, useState } from 'react';

import { Pokemon, randomPokemon } from '@/api/queries/random-pokemon';
import PokemonCard from '@/features/pokemon-list/components/pokemon-card';

export default function RandomPage() {
  const POKEMON_COUNT = 9;
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const tempNames: Promise<Pokemon>[] = [];

    for (let i = 0; i < POKEMON_COUNT; i += 1) tempNames.push(randomPokemon());

    Promise.all(tempNames).then((res) => setPokemon(res));
  }, []);

  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>
          <PokemonCard
            id={p.id}
            name={p.name}
            key={p.id}
            pokemon_v2_pokemons={p.pokemon_v2_pokemons}
          />
        </div>
      ))}
    </div>
  );
}
