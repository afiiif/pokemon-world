import { DefaultSeo as DefaultNextSeo } from 'next-seo';

export default function DefaultSeo() {
  return (
    <DefaultNextSeo
      defaultTitle="Pokémon Awesome"
      titleTemplate="%s | Pokémon Awesome"
      description={process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION || 'Pokémon Awesome'}
    />
  );
}
