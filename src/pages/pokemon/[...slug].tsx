import clsx from 'clsx';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Masonry from 'react-masonry-css';
import { dehydrate, DehydratedState } from 'react-query';

import { fetchPokemon, useQueryPokemonTypes } from '@/api/queries/pokemon';
import { fetchPokemonSpecies } from '@/api/queries/pokemon-species';
import queryClient from '@/config/react-query';
import PokemonDetailDesciption from '@/features/pokemon-detail/components/pokemon-detail-desciption';
import PokemonDetailMain from '@/features/pokemon-detail/components/pokemon-detail-main';
import PokemonDetailSeo from '@/features/pokemon-detail/components/pokemon-detail-seo';
import useCurrentPokemon from '@/features/pokemon-detail/hooks/use-current-pokemon';
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
      <PokemonDetailSeo />

      <section id="_pokemon-detail-main-card" className={`bg-elm-${pokemonTypes[0]}`}>
        <PokemonDetailMain key={pokemon.name} />
      </section>

      <Masonry
        breakpointCols={{ default: 2, 768: 1 }}
        className={`pokemon-detail-card-container bg-elm-${pokemonTypes[0]}`}
      >
        <PokemonDetailDesciption />
        <section className="pokemon-detail-card">
          <h2>Stats</h2>
          <div className="h-64">...</div>
        </section>
        <section className="pokemon-detail-card">
          <h2>Habitat</h2>
          <p className={clsx(!pokemonSpecies.habitat && 'text-gray-400')}>
            {snakeCaseToTitleCase(pokemonSpecies.habitat || 'N/A')}
          </p>
        </section>
        <section className="pokemon-detail-card">
          <h2>Abilities</h2>
          <ul className="list-disc space-y-2 pl-5">
            {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
              <li key={pokemon_v2_ability.name}>
                <h3 className="font-semibold">{snakeCaseToTitleCase(pokemon_v2_ability.name)}</h3>
                <p className="text-sm text-gray-500">
                  {pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="pokemon-detail-card">
          <h2>Moves</h2>
          <p className="h-72">...</p>
        </section>
      </Masonry>
    </>
  );
}
