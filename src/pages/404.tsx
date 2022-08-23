import Link from 'next/link';

export default function Error404Page() {
  return (
    <>
      <h1 className="pt-14 text-center text-6xl font-bold text-rose-500">
        <span>ERROR</span>
        <br />
        <span className="text-9xl">404</span>
      </h1>

      <p className="text-center text-xl tracking-widest text-gray-500">PAGE NOT FOUND</p>

      <p className="py-16 text-center">
        Anyway, pokémon number #404 is{' '}
        <Link href="/pokemon/luxio" className="font-semibold text-sky-500">
          Luxio
        </Link>{' '}
        ⚡️
        <br />
        Say something to him...
      </p>
    </>
  );
}
