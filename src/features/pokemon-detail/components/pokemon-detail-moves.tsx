import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';
import PokemonDetailMovesTable from './pokemon-detail-moves-table';

export default function PokemonDetailMoves() {
  const { pokemon } = useCurrentPokemon();

  return (
    <PokemonDetailCard heading="Moves">
      <PokemonDetailMovesTable pokemon={pokemon} />
    </PokemonDetailCard>
  );
}
