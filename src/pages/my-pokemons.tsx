import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { HiTrash } from 'react-icons/hi';

import PokemonImage from '@/components/commons/pokemon-image';
import DefaultOgImage from '@/components/headless/seo/default-og-image';
import { useMyPokemons } from '@/features/my-pokemons/contexts/my-pokemons';
import { formatPokemonId } from '@/helpers/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function MyPokemonsPage() {
  const { myPokemons, setMyPokemons } = useMyPokemons();

  if (myPokemons.length === 0) {
    return (
      <>
        <NextSeo title="My Pokémons" />
        <DefaultOgImage />

        <div className="space-y-5 italic">
          <p>
            <span>So you wanna be the master of Pokémon?</span>
            <br />
            <span>Understand the secrets and have some fun!</span>
          </p>

          <p>
            <span>So you wanna be the master of Pokémon?</span>
            <br />
            <span>Do you have the skills to be number one?</span>
          </p>
        </div>

        <Link href="/" className="mt-10 inline-block rounded-md bg-elm-water px-6 py-4 focus:ring">
          ➡️ &nbsp;Explore and Catch Pokémon!
        </Link>
      </>
    );
  }

  return (
    <>
      <NextSeo title="My Pokémons" />
      <DefaultOgImage />

      <h1 className="h1 pb-6">My Pokémons</h1>

      <div className="pokemon-card-container">
        {myPokemons.map(({ id, name, types }) => (
          <div key={id} className="relative">
            <Link
              href={`/pokemon/${name}`}
              className={`pokemon-card peer group rounded-b-none bg-elm-${types[0]}`}
            >
              <b className="col-span-3 text-xl">{snakeCaseToTitleCase(name)}</b>
              <b className="col-span-2 pt-3.5">Type:</b>
              <div className="col-span-2 -mr-5 capitalize">{types.join(', ')}</div>
              <PokemonImage
                idPokemon={id}
                alt={name}
                size={128}
                className="group-hover:scale-125"
                priority={id < 7}
              />
              <div className="pokemon-card-number">{formatPokemonId(id)}</div>
              <div className="pokeball-flat" />
            </Link>
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-alert
                if (window.confirm(`Are you sure you want to release ${name}?`)) {
                  setMyPokemons((prev) => prev!.filter((pokemon) => pokemon.id !== id));
                }
              }}
              className="flex w-full items-center gap-2 rounded-b-md border px-4 py-2 hover:bg-black hover:text-white dark:bg-dark-card dark:hover:bg-black"
            >
              <HiTrash />
              Release
            </button>
          </div>
        ))}

        {/* Add 2 empty div to enforce 3 columns layout even when just displaying 1 card */}
        <div />
        <div />
      </div>
    </>
  );
}
