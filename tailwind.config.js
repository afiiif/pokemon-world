// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

const ELEMENTS = [
  'undefined',
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

const GUESS_POKEMON_IMG_CLASSNAMES = [
  'grayscale',
  'brightness-0',
  'rotate-45',
  'rotate-90',
  'rotate-180',
  '-rotate-45',
  '-rotate-90',
  '-rotate-180',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        typography: {
          light: colors.gray[700],
          dark: colors.slate[300],
        },
        elm: Object.fromEntries(ELEMENTS.map((current) => [current, `var(--elm-${current})`])),
        dark: {
          base: '#19202a',
          card: '#25303f',
          light: '#2a3647',
        },
      },
    },
  },
  plugins: [],
  safelist: [...ELEMENTS.map((elm) => `bg-elm-${elm}`), ...GUESS_POKEMON_IMG_CLASSNAMES],
};
