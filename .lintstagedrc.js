module.exports = {
  '*.{js,jsx,ts,tsx}': 'eslint --fix --quiet',
  '*.{js,jsx,ts,tsx,css,scss,json,html,md,mdx}': 'prettier --write',
  '*.{ts,tsx}': () => 'tsc --noEmit --skipLibCheck',
};
