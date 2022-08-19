import Image from 'next/future/image';
import Link from 'next/link';
import { HiTrash } from 'react-icons/hi';
import { useLocalStorage } from 'react-power-ups';

import { validateLocalStorageData } from '@/features/my-pokemons/utils/validate-local-storage';
import { formatPokemonId, getPokemonImage } from '@/helpers/pokemon';
import { MyPokemon } from '@/types/pokemon';
import { snakeCaseToTitleCase } from '@/utils/string';

export default function MyPokemonsPage() {
  const [storageData, setMyPokemons] = useLocalStorage<MyPokemon[]>('myPokemons');

  const myPokemons = validateLocalStorageData(storageData) ? storageData! : [];

  if (myPokemons.length === 0) {
    return (
      <>
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
      <h1 className="pb-6 text-2xl font-bold">My Pokémons</h1>

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
              <Image
                src={getPokemonImage(id)}
                alt={name}
                width={128}
                height={128}
                quality={25}
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
