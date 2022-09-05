import PokemonImage from '@/components/commons/pokemon-image';

export default function OfflineFallbackPage() {
  return (
    <>
      <div className="flex justify-center pt-8 pb-4">
        <PokemonImage idPokemon={518} size={128} className="grayscale" />
      </div>
      <p className="text-center text-xl font-semibold">Can&apos;t Load Page</p>
      <p className="pb-8 text-center text-lg text-gray-500">You are currently offline...</p>
    </>
  );
}
