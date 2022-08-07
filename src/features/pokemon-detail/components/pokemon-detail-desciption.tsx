import { HiArrowCircleRight } from 'react-icons/hi';
import Slider from 'react-slick';

import useCurrentPokemon from '../hooks/use-current-pokemon';

export default function PokemonDetailDesciption() {
  const { pokemonSpecies } = useCurrentPokemon();

  return (
    <section className="pokemon-detail-card">
      <Slider
        className="pokemon-desc-slick"
        adaptiveHeight
        nextArrow={
          <button type="button">
            <HiArrowCircleRight />
          </button>
        }
        prevArrow={
          <button type="button">
            <HiArrowCircleRight />
          </button>
        }
      >
        {pokemonSpecies.descriptions.map((description) => (
          <p key={description}>{description}</p>
        ))}
      </Slider>
    </section>
  );
}
