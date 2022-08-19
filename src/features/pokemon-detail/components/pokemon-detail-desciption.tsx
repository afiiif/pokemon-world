import Slider from 'react-slick';

import useCurrentPokemon from '../hooks/use-current-pokemon';
import PokemonDetailCard from './pokemon-detail-card';

export default function PokemonDetailDesciption() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <PokemonDetailCard>
      <Slider
        className="pokemon-desc-slick"
        adaptiveHeight
        arrows={false}
        dots
        autoplay
        autoplaySpeed={7000}
      >
        {pokemonSpecies.descriptions.map((description) => (
          <p key={description}>{description}</p>
        ))}
      </Slider>
    </PokemonDetailCard>
  );
}
