import Image from 'next/future/image';
import Link from 'next/link';

import { Pokemon_V2_Pokemonspecies } from '@/generated/graphql.types';
import { getPokemonImage } from '@/helpers/pokemon';

export default function PokemonCard({ id, name, pokemon_v2_pokemons }: Pokemon_V2_Pokemonspecies) {
  const types = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
    (item) => item.pokemon_v2_type!.name,
  );

  return (
    <Link href={`/pokemon/${name}`} className={`pokemon-card group bg-elm-${types[0]}`}>
      <b className="col-span-3 text-xl capitalize">{name.replace('-', ' ')}</b>
      <b className="col-span-2 pt-3.5">Type:</b>
      <div className="col-span-2 -mr-5 capitalize">{types.join(', ')}</div>
      <Image
        src={getPokemonImage(id)}
        alt={name}
        width={128}
        height={128}
        quality={1}
        className="group-hover:scale-125"
      />
      <div className="pokemon-card-number">{String(id).padStart(3, '0')}</div>
      <div className="pokeball-flat" />
    </Link>
  );
}
