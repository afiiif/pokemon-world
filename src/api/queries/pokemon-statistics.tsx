import { useQuery } from '@tanstack/react-query';

type FetchStatisticsResponse = {
  keys: string[];
  colors: string[];
  data: number[][];
  pokemons: {
    [key: string]: string[];
  };
};

export const fetchStatistics = async (): Promise<FetchStatisticsResponse> => {
  const res = await fetch('/generated/statistics/types.json');
  return res.json();
};

export const usePokemonStatistics = () =>
  useQuery<FetchStatisticsResponse>(['pokemon-statistics'], fetchStatistics);
