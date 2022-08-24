import Link from 'next/link';

import { QueryPokemonsData } from '@/api/queries/pokemons';
import PokemonImage from '@/components/commons/pokemon-image';
import { formatPokemonId } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function PokemonCard({ id, name, pokemon_v2_pokemons }: QueryPokemonsData[0]) {
  const types = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
    (item) => item.pokemon_v2_type!.name,
  );

  return (
    <Link href={`/pokemon/${name}`} className={`pokemon-card group bg-elm-${types[0]}`}>
      <b className="col-span-3 text-xl">{snakeCaseToTitleCase(name)}</b>
      <b className="col-span-2 pt-3.5">Type:</b>
      <div className="col-span-2 -mr-5 capitalize">{types.join(', ')}</div>
      <PokemonImage
        idPokemon={id}
        alt={name}
        size={128}
        className="group-hover:scale-125"
        priority={id < 7}
      />
      <div className="pokemon-card-number">{formatPokemonId(id)}</div>
      <div className="pokeball-flat" />
    </Link>
  );
}
