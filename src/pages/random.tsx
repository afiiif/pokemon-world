import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

import { Pokemon, randomPokemon } from '@/api/queries/random-pokemon';
import PokemonCard from '@/features/pokemon-list/components/pokemon-card';
import PokemonCardsShimmer from '@/features/pokemon-list/components/pokemon-cards-shimmer';

export default function RandomPage() {
  const POKEMON_COUNT = 12;
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const randomize = () => {
    const tempNames: Promise<Pokemon>[] = [];
    setIsLoading(true);
    setPokemon([]);

    for (let i = 0; i < POKEMON_COUNT; i += 1) tempNames.push(randomPokemon());

    Promise.all(tempNames).then((res) => {
      setPokemon(res);
      setIsLoading(false);
    });
  };

  useEffect(() => randomize, []);

  return (
    <>
      <NextSeo title="Random Pokemon" />

      <div className="flex items-baseline justify-between">
        <h1 className="h1 pb-6">Random Pokemon</h1>

        <button
          type="button"
          onClick={randomize}
          className="flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-white dark:bg-blue-800"
        >
          <HiOutlineRefresh className="text-2xl" />
          Randomize
        </button>
      </div>

      <div className="pokemon-card-container">
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
        {isLoading && <PokemonCardsShimmer />}
      </div>
    </>
  );
}
