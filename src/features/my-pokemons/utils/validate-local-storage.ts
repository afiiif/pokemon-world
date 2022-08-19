export const validateLocalStorageData = (data: unknown): boolean =>
  typeof data === 'object' &&
  // @ts-ignore
  data?.[0] &&
  (data as Object[]).every(
    // @ts-ignore
    ({ id, name, types }) =>
      typeof id === 'number' &&
      typeof name === 'string' &&
      typeof types === 'object' &&
      typeof types[0] === 'string',
  );
