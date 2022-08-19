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
        <div className="shimmer mt-3 h-3 w-24" />
        <div className="shimmer -mt-3 ml-auto h-3 w-12" />
        <div className="shimmer mt-3.5 h-3 w-20" />
        <div className="shimmer -mt-3 ml-auto h-3 w-12" />
        <div className="shimmer mt-3.5 h-3 w-28" />
        <div className="shimmer -mt-3 ml-auto h-3 w-12" />
        <div className="shimmer mt-3.5 h-3 w-16" />
        <div className="shimmer -mt-3 ml-auto h-3 w-12" />
        <div className="shimmer mt-3.5 h-3 w-20" />
        <div className="shimmer -mt-3 mb-5 ml-auto h-3 w-12" />
      </Card>
    );
  }

  return (
    <Card heading="Moves" className="flex-grow">
      <PokemonDetailMovesTable pokemon={pokemon} />
    </Card>
  );
}
