import { TYPE } from '@/constants/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailMoves() {
  const { pokemon } = useCurrentPokemon();

  return (
    <section className="pokemon-detail-card">
      <h2>Moves</h2>
      {pokemon.pokemon_v2_pokemonmoves.length > 0 ? (
        <div className="relative max-h-[26rem] overflow-y-auto">
          <table className="w-full border-separate border-spacing-0 border-l text-sm">
            <thead className="sticky top-0 bg-white text-left">
              <tr>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Name</th>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Type</th>
                <th className="border-t border-b-2 border-r px-2 py-1.5">Power</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.pokemon_v2_pokemonmoves.map(({ pokemon_v2_move }) => {
                const moveType = TYPE[pokemon_v2_move.type_id as keyof typeof TYPE];
                return (
                  <tr key={pokemon_v2_move.name} className="hover:bg-slate-50">
                    <td className="border-b border-r px-2 py-1">
                      {snakeCaseToTitleCase(pokemon_v2_move.name)}
                    </td>
                    <td className="flex items-center gap-1.5 border-b border-r px-2 py-1 capitalize">
                      <div className={`h-2.5 w-2.5 rounded-full bg-elm-${moveType}`} />
                      {moveType}
                    </td>
                    <td className="border-b border-r px-2 py-1">{pokemon_v2_move.power || '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-400">N/A</div>
      )}
    </section>
  );
}
