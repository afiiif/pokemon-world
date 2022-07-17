import Image from 'next/future/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="_header">
      <div id="_header-inner">
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
