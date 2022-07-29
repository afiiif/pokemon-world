import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { dehydrate, DehydratedState } from 'react-query';

import { fetchPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { fetchPokemonSpecies } from '@/api/queries/pokemon-species';
import queryClient from '@/config/react-query';
import PokemonDetailDesciption from '@/features/pokemon-detail/components/pokemon-detail-desciption';
import PokemonDetailForms from '@/features/pokemon-detail/components/pokemon-detail-forms';
import PokemonDetailMain from '@/features/pokemon-detail/components/pokemon-detail-main';
import useCurrentPokemon from '@/features/pokemon-detail/hooks/use-current-pokemon';
import { formatPokemonId, getDescription } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

type Context = GetStaticPropsContext<{ slug: [string] | [string, string] }>;
type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

export async function getStaticProps({ params }: Context): Promise<Result> {
  const { slug } = params!;
  if (slug.length > 2) {
    return {
      notFound: true,
    };
  }

  const [pokemonSpeciesName, pokemonNameSlug] = slug;

  try {
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

export default function PokemonDetail() {
  const { pokemonSpecies, pokemon } = useCurrentPokemon();
  const pokemonTypes = useQueryPokemonTypes(pokemon.name).data!;

  return (
    <>
      <NextSeo
        title={`${snakeCaseToTitleCase(pokemon.name)} #${formatPokemonId(pokemon.id)}`}
        description={getDescription(pokemonSpecies, pokemon)}
      />

      <section id="_pokemon-detail-main-card" className={`bg-elm-${pokemonTypes[0]}`}>
        <PokemonDetailMain key={pokemon.name} />
      </section>

      <section className={`pokemon-detail-card-container bg-elm-${pokemonTypes[0]}`}>
        <PokemonDetailForms />
        <PokemonDetailDesciption />
        <section className="pokemon-detail-card">
          <h2>Stats</h2>
          <p>...</p>
        </section>
        <section className="pokemon-detail-card">
          <h2>Abilities</h2>
          <p>...</p>
        </section>
        <section className="pokemon-detail-card">
          <h2>Moves</h2>
          <p>...</p>
        </section>
      </section>
    </>
  );
}
