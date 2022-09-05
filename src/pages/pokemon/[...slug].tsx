import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Masonry from 'react-masonry-css';

import { fetchPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { fetchPokemonSpecies } from '@/api/queries/pokemon-species';
import getQueryClient from '@/config/react-query';
import PokemonDetailAbilities from '@/features/pokemon-detail/components/pokemon-detail-abilities';
import PokemonDetailBaseStats from '@/features/pokemon-detail/components/pokemon-detail-base-stats';
import PokemonDetailCompare from '@/features/pokemon-detail/components/pokemon-detail-compare';
import PokemonDetailDesciption from '@/features/pokemon-detail/components/pokemon-detail-desciption';
import PokemonDetailEvolution from '@/features/pokemon-detail/components/pokemon-detail-evolution';
import PokemonDetailHabitat from '@/features/pokemon-detail/components/pokemon-detail-habitat';
import PokemonDetailMain from '@/features/pokemon-detail/components/pokemon-detail-main';
import PokemonDetailMoves from '@/features/pokemon-detail/components/pokemon-detail-moves';
import PokemonDetailSeo from '@/features/pokemon-detail/components/pokemon-detail-seo';
import useCurrentPokemon from '@/features/pokemon-detail/hooks/use-current-pokemon';
import { PokemonEvolution } from '@/types/pokemon';
import allEvolutions from '~/generated/pokemon-evolution.json';

type Context = GetStaticPropsContext<{ slug: [string] | [string, string] }>;
type Result = GetStaticPropsResult<{
  dehydratedState: DehydratedState;
  evolutions: PokemonEvolution[];
}>;

export async function getStaticProps({ params }: Context): Promise<Result> {
  const { slug } = params!;
  if (slug.length > 2) {
    return {
      notFound: true,
    };
  }

  const [pokemonSpeciesName, pokemonNameSlug] = slug;

  const evolutions = allEvolutions.filter((pokemons) =>
    pokemons.some(({ name }) => name === pokemonSpeciesName),
  );

  try {
    const queryClient = getQueryClient();

    const data = await queryClient.fetchQuery(
      ['pokemon-species', pokemonSpeciesName],
      fetchPokemonSpecies,
    );

    const pokemonName = pokemonNameSlug || data.pokemon_v2_pokemons[0].name;

    await queryClient.fetchQuery(['pokemon', pokemonName], fetchPokemon);

    // https://github.com/tannerlinsley/react-query/issues/1458
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return {
      props: {
        dehydratedState,
        evolutions,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['bulbasaur', 'charmander', 'squirtle', 'pikachu'].map((pokemonName) => ({
      params: { slug: [pokemonName] },
    })),
    fallback: 'blocking',
  };
}

type Props = {
  evolutions: PokemonEvolution[];
};

export default function PokemonDetailPage({ evolutions }: Props) {
  const { pokemon } = useCurrentPokemon();
  const pokemonTypes = useQueryPokemonTypes(pokemon.name).data!;

  return (
    <>
      <PokemonDetailSeo />

      <section id="_pokemon-detail-main-card" className={`bg-elm-${pokemonTypes[0]}`}>
        <PokemonDetailMain key={pokemon.name} />
      </section>

      <PokemonDetailEvolution evolutions={evolutions} type={pokemonTypes[0]} />

      <Masonry
        breakpointCols={{ default: 2, 768: 1 }}
        className={`pokemon-detail-card-container bg-elm-${pokemonTypes[0]}`}
      >
        <PokemonDetailDesciption />
        <PokemonDetailBaseStats />
        <PokemonDetailHabitat />
        <PokemonDetailAbilities />
        <PokemonDetailMoves />
        <PokemonDetailCompare />
      </Masonry>
    </>
  );
}
