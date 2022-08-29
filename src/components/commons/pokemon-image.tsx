import Image from 'next/future/image';
import Head from 'next/head';
import { ReactEventHandler } from 'react';

type Props = {
  idPokemon: number;
  size: number;
  requestedSize?: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  alt?: string;
  onError?: ReactEventHandler<HTMLImageElement>;
};

const PNG_IMAGE_URL =
  'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const WEBP_IMAGE_URL = 'https://cdn.statically.io/gh/afiiif/pokemon-assets/main/artwork/webp';

/**
 * Vercel image optimization for free-tier has 1000 image limitation.
 * Therefore, only pokemon generation 1 will use Next Image component.
 */
export default function PokemonImage({
  idPokemon,
  size,
  requestedSize: requestedSizeTemp,
  priority,
  className,
  imgClassName,
  alt = 'pokemon',
  onError,
  ...props
}: Props & JSX.IntrinsicElements['picture']) {
  const pngSrc = `${PNG_IMAGE_URL}/${idPokemon}.png`;

  if (idPokemon <= 151) {
    return (
      <Image
        src={pngSrc}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        className={className}
        onError={onError}
      />
    );
  }

  const requestedSize = requestedSizeTemp || size * 1.5;

  const webpSrc = `${WEBP_IMAGE_URL}/${requestedSize}x${requestedSize}/${idPokemon}.webp`;

  return (
    <>
      {priority && (
        <Head>
          <link rel="preload" as="image" href={webpSrc} />
        </Head>
      )}

      <picture className={className} onError={onError} {...props}>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={pngSrc} type="image/png" />
        <img
          src={pngSrc}
          alt={alt}
          loading={priority ? undefined : 'lazy'}
          className={imgClassName}
          width={size}
          height={size}
        />
      </picture>
    </>
  );
}
