import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { dehydrate, DehydratedState } from 'react-query';

import { queryPokemon, useQueryPokemon } from '@/api/queries/pokemon';
import PokemonDetailCard from '@/components/features/pokemon-detail/pokemon-detail-card';
import queryClient from '@/config/react-query';

type Context = GetStaticPropsContext<{ pokemonName: string }>;
type Result = GetStaticPropsResult<{ pokemonName: string; dehydratedState: DehydratedState }>;

export async function getStaticProps({ params }: Context): Promise<Result> {
  const { pokemonName } = params!;
  await queryClient.fetchQuery(['pokemon', pokemonName], queryPokemon);

  // https://github.com/tannerlinsley/react-query/issues/1458
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      pokemonName,
      dehydratedState,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

type Props = {
  pokemonName: string;
};

export default function PokemonDetail({ pokemonName }: Props) {
  const { data } = useQueryPokemon(pokemonName);

  return <PokemonDetailCard pokemon={data!.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0]} />;
}
