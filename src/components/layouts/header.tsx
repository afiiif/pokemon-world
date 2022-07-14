import Image from 'next/future/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 translate-y-[var(--scroll-distance)] bg-white shadow lg:col-span-full lg:translate-y-0">
      <div className="mx-auto flex h-16 max-w-7xl justify-between px-3.5 py-2.5 lg:h-20 lg:px-6">
        <Link href="/" className="-ml-px inline-flex flex-col items-end">
          <Image
            src="/images/pokemon-logo.png"
            width={320 * 0.48}
            height={118 * 0.48}
            quality={30}
            alt="Pokemon logo"
            className="h-auto w-20 lg:w-[154px]"
          />
          <div className="-mt-1 inline-block -rotate-6 border border-white bg-gradient-to-br from-sky-600 to-pink-600 px-3 text-[9px] font-bold tracking-widest text-white lg:text-base">
            WORLD
          </div>
        </Link>
        <div className="self-center">[ 🚧 Menu ]</div>
      </div>
    </header>
  );
}
