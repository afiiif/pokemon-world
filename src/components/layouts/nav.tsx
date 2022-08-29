import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  HiOutlineArchive,
  HiOutlineColorSwatch,
  HiOutlineInformationCircle,
  HiOutlineLightBulb,
  HiOutlineMenu,
  HiOutlinePresentationChartLine,
  HiOutlineSwitchHorizontal,
  HiOutlineViewGrid,
  HiOutlineX,
} from 'react-icons/hi';
import { useToggle } from 'react-power-ups';

export default function Nav() {
  const [menuExpanded, toggleExpand] = useToggle();
  const { asPath } = useRouter();
  useEffect(() => {
    toggleExpand(false);
  }, [asPath, toggleExpand]);

  return (
    <nav id="_nav">
      <ul id="_nav-inner">
        <li className="order-2 flex-1">
          <Link href="/" className="nav-link">
            <HiOutlineViewGrid className="text-2xl" />
            Pokémons
          </Link>
        </li>
        <li className="order-2 flex-1">
          <Link href="/compare" className="nav-link">
            <HiOutlineColorSwatch className="text-2xl" />
            Compare
          </Link>
        </li>
        <li className="order-2 flex-1">
          <Link href="/statistics/types" className="nav-link">
            <HiOutlinePresentationChartLine className="text-2xl" />
            Statistics
          </Link>
        </li>
        <li className="order-2 flex-1 md:hidden">
          <button
            type="button"
            className={clsx('nav-link', menuExpanded && 'text-rose-500')}
            onClick={toggleExpand}
          >
            {menuExpanded ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
            {menuExpanded ? 'Hide Menu' : 'All Menu'}
          </button>
        </li>
        <li className={clsx('order-1 flex-1 md:order-2 md:block', !menuExpanded && 'hidden')}>
          <Link href="/my-pokemons" className="nav-link">
            <HiOutlineArchive className="text-2xl" />
            My Pokémons
          </Link>
        </li>
        <li className={clsx('order-1 flex-1 md:order-2 md:block', !menuExpanded && 'hidden')}>
          <Link href="/evolutions" className="nav-link">
            <HiOutlineSwitchHorizontal className="text-2xl" />
            Evolutions
          </Link>
        </li>
        <li className={clsx('order-1 flex-1 md:order-2 md:block', !menuExpanded && 'hidden')}>
          <Link href="/guess-pokemon" className="nav-link">
            <HiOutlineLightBulb className="text-2xl" />
            Guess a Pokémon
          </Link>
        </li>
        <li className={clsx('order-1 flex-1 md:order-2 md:block', !menuExpanded && 'hidden')}>
          <Link href="/about" className="nav-link">
            <HiOutlineInformationCircle className="text-2xl" />
            About
          </Link>
        </li>
        <li className={clsx('order-1 w-full md:hidden', !menuExpanded && 'hidden')} />
      </ul>
    </nav>
  );
}
