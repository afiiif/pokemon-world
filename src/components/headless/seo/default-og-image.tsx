import { NextSeo } from 'next-seo';

export default function DefaultOgImage() {
  return (
    <NextSeo
      openGraph={{
        images: [
          {
            url: `${
              process.env.NEXT_PUBLIC_BASE_URL || ''
            }/images/pokemon-awesome-thumbnail-1200x630.jpg`,
            width: 1200,
            height: 630,
            alt: 'Pokemon Awesome',
            type: 'image/jpeg',
          },
          {
            url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/pokemon-awesome-thumbnail.jpg`,
            width: 2560,
            height: 1280,
            alt: 'Pokemon Awesome',
            type: 'image/jpeg',
          },
        ],
      }}
    />
  );
}
