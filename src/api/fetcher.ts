import { request, RequestDocument, Variables } from 'graphql-request';

export const API_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

const fetcher = <T>(document: RequestDocument, variables?: Variables) =>
  request<T>(API_ENDPOINT, document, variables);

export default fetcher;
