import Head from 'next/head';
import { useReducer } from 'react';
import { useWindowEvent } from 'react-power-ups';

type ScrollState = {
  position: number;
  hideHeader: boolean;
};

const scrollReducer = (prev: ScrollState) => {
  const newPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = newPosition - prev.position;
  return {
    position: newPosition,
    hideHeader: newPosition > 128 && distance > 0,
  };
};

export default function CustomStyles() {
  const [scrollState, dispatchScrollState] = useReducer(scrollReducer, {
    position: 0,
    hideHeader: false,
  });

  useWindowEvent('scroll', dispatchScrollState);

  return (
    <Head>
      <style>
        {`
          :root {
            --header-distance: ${scrollState.hideHeader ? '-4rem' : 0};
          }
        `}
      </style>
    </Head>
  );
}
