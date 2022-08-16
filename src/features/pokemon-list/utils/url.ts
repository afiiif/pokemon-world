type FilterParam = { q: string } | { gen: string } | { type: string };

export const getFilterParam = () => {
  const queryString = new URLSearchParams(window.location.search);

  const q = queryString.get('q');
  const gen = queryString.get('gen');
  const type = queryString.get('type');

  return { q, gen, type };
};

export const getNewRoute = (param: FilterParam) => {
  const { q, gen, type } = getFilterParam();
  const merged = { q, gen, type, ...param };

  const temp = [];
  if (merged.q) temp.push(['q', merged.q]);
  if (Number(merged.gen)) temp.push(['gen', merged.gen]);
  if (Number(merged.type)) temp.push(['type', merged.type]);

  const qs = temp.map(([key, value]) => `${key}=${value}`).join('&');
  return `${window.location.pathname}?${qs}`;
};
