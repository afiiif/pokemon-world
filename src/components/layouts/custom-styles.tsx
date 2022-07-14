import Head from 'next/head';
import { useReducer } from 'react';
import { useWindowEvent } from 'react-power-ups';

type ScrollState = {
  position: number;
  distance: number;
};

const scrollReducer = (prev: ScrollState) => {
  const newPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = newPosition - prev.position;
  return {
    position: newPosition,
    distance: Math.max(0, Math.min(64, prev.distance + distance)),
  };
};

export default function CustomStyles() {
  const [scrollState, dispatchScrollState] = useReducer(scrollReducer, {
    position: 0,
    distance: 0,
  });

  useWindowEvent('scroll', dispatchScrollState);

  return (
    <Head>
      <style>
        {`
          :root {
            --scroll-distance: -${scrollState.distance}px
          }
        `}
      </style>
    </Head>
  );
}
