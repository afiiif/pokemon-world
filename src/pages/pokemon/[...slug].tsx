import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { dehydrate, DehydratedState } from 'react-query';

import { fetchPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { fetchPokemonSpecies } from '@/api/queries/pokemon-species';
import queryClient from '@/config/react-query';
import PokemonDetailForms from '@/features/pokemon-detail/components/pokemon-detail-forms';
import PokemonDetailMain from '@/features/pokemon-detail/components/pokemon-detail-main';
import useCurrentPokemon from '@/features/pokemon-detail/hooks/use-current-pokemon';
import { getDescription, getPokemonId } from '@/helpers/pokemon';
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
  const hasForms = pokemonSpecies.pokemon_v2_pokemons.length > 1;

  return (
    <>
      <NextSeo
        title={`${snakeCaseToTitleCase(pokemon.name)} #${getPokemonId(pokemon.id)}`}
        description={getDescription(pokemon)}
      />

      <section id="_pokemon-detail-card" className={`bg-elm-${pokemonTypes[0]}`}>
        <PokemonDetailMain key={pokemon.name} />
      </section>

      <section
        className={`bg-elm-${pokemonTypes[0]} relative -mx-3.5 -mb-16 p-3.5 pb-16 transition-[background] md:mt-4 md:pt-0 lg:mt-6 lg:mb-0 lg:bg-transparent lg:pb-0 lg:transition-none`}
      >
        {hasForms && <PokemonDetailForms />}
      </section>
    </>
  );
}
