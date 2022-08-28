import { request, RequestDocument, Variables } from 'graphql-request';
import { isBrowser } from 'react-power-ups/lib/utils';

import { API_ENDPOINT } from '@/constants/pokemon';
import { optmizeGQLString } from '@/utils/string';

/**
 * It's a little bit complicated to cache GraphQL "POST" request.
 * So here is workaround to make it a "GET" request.
 */
export const fetchViaInternalApi = async <T>(document: string, variables: unknown = null) => {
  const res = await fetch(
    `/api/pokemon?q=${encodeURIComponent(document)}&v=${encodeURIComponent(
      JSON.stringify(variables),
    )}`,
  );
  const data: T = await res.json();
  return data;
};

const fetcher = <T>(document: RequestDocument, variables?: Variables) =>
  isBrowser
    ? fetchViaInternalApi<T>(optmizeGQLString(document as string), variables)
    : request<T>(API_ENDPOINT, document, variables);

export default fetcher;
