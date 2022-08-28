type FilterParam = { gen: string } | { type: string };

export const getFilterParam = () => {
  const queryString = new URLSearchParams(window.location.search);

  const gen = queryString.get('gen');
  const type = queryString.get('type');

  return { gen, type };
};

export const getNewRoute = (param: FilterParam) => {
  const { gen, type } = getFilterParam();
  const merged = { gen, type, ...param };

  const temp = [];
  if (Number(merged.gen)) temp.push(['gen', merged.gen]);
  if (merged.type) temp.push(['type', merged.type]);

  const qs = temp.map(([key, value]) => `${key}=${value}`).join('&');
  return `${window.location.pathname}?${qs}`;
};
