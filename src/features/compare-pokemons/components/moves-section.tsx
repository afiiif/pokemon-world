import { useQueryPokemon } from '@/api/queries/pokemon';
import PokemonDetailMovesTable from '@/features/pokemon-detail/components/pokemon-detail-moves-table';

import Card from './card';

type Props = {
  pokemonName: string;
};

export default function MovesSection({ pokemonName }: Props) {
  const pokemon = useQueryPokemon(pokemonName).data;

  if (!pokemon) {
    return (
      <Card heading="Moves">
        <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-white/10 invert" />
        <div className="-mt-3 ml-auto h-3 w-12 animate-pulse rounded-full bg-white/10 invert" />
        <div className="mt-3.5 h-3 w-20 animate-pulse rounded-full bg-white/10 invert" />
        <div className="-mt-3 ml-auto h-3 w-12 animate-pulse rounded-full bg-white/10 invert" />
        <div className="mt-3.5 h-3 w-28 animate-pulse rounded-full bg-white/10 invert" />
        <div className="-mt-3 ml-auto h-3 w-12 animate-pulse rounded-full bg-white/10 invert" />
        <div className="mt-3.5 h-3 w-16 animate-pulse rounded-full bg-white/10 invert" />
        <div className="-mt-3 ml-auto h-3 w-12 animate-pulse rounded-full bg-white/10 invert" />
        <div className="mt-3.5 h-3 w-20 animate-pulse rounded-full bg-white/10 invert" />
        <div className="-mt-3 mb-5 ml-auto h-3 w-12 animate-pulse rounded-full bg-white/10 invert" />
      </Card>
    );
  }

  return (
    <Card heading="Moves" className="flex-grow">
      <PokemonDetailMovesTable pokemon={pokemon} />
    </Card>
  );
}
