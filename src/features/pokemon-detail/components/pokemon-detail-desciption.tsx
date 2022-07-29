import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailDesciption() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <section className="pokemon-detail-card space-y-3 text-sm">
      {pokemonSpecies.descriptions.map((description) => (
        <p key={description}>{description}</p>
      ))}
    </section>
  );
}
