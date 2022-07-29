export default function PokemonCardsShimmer() {
  return (
    <>
      {[...Array(12).keys()].map((key) => (
        <div key={key} className="pokemon-card h-[168px]">
          <div className="mt-1.5 h-5 w-16 animate-pulse rounded-full bg-white/10 invert" />
          <div className="pokeball-flat animate-pulse opacity-30 invert" />
        </div>
      ))}
    </>
  );
}
