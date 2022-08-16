export const toSentenceCase = (str: string = '') =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const snakeCaseToTitleCase = (str: string) =>
  str.replace(/^(.)|-+(.)/g, (_, p1, p2) => (p1 ? p1.toUpperCase() : ` ${p2.toUpperCase()}`));

export const titleCaseToSnakeCase = (str: string) => str.replace(/\s/g, '-').toLowerCase();

export const optmizeGQLString = (str: string) =>
  str.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '');
