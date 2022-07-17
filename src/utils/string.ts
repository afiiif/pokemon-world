export const toSentenceCase = (str: string = '') =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const optmizeGQLString = (str: string) =>
  str.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '');
