// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

const elements = {
  bug: '#9dc130',
  dark: '#5f606d',
  dragon: '#0773c7',
  electric: '#edd53f',
  fairy: '#ef97e6',
  fighting: '#d94256',
  fire: '#fc6c6d',
  flying: '#9bb4e8',
  ghost: '#7975d4',
  grass: '#5dbe62',
  ground: '#d78555',
  ice: '#98d8d8',
  normal: '#9a9da1',
  poison: '#b563ce',
  psychic: '#f85888',
  rock: '#cec18c',
  steel: '#b8b8d0',
  water: colors.blue[400],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        elm: elements,
      },
    },
  },
  plugins: [],
  safelist: Object.keys(elements).map((elm) => `bg-elm-${elm}`),
};
