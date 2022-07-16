export const toSentenceCase = (str: string = '') =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');
