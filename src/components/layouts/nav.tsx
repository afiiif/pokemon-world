import Link from 'next/link';
import {
  HiOutlineArchive,
  HiOutlineColorSwatch,
  HiOutlinePresentationChartLine,
  HiOutlineViewGrid,
} from 'react-icons/hi';

export default function Nav() {
  return (
    <nav id="_nav">
      <ul id="_nav-inner">
        <li className="flex-1">
          <Link href="/" className="nav-link">
            <HiOutlineViewGrid className="text-2xl" />
            Pokémons
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/compare" className="nav-link">
            <HiOutlineColorSwatch className="text-2xl" />
            Compare
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/statistics" className="nav-link">
            <HiOutlinePresentationChartLine className="text-2xl" />
            Statistics
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/my-pokemons" className="nav-link">
            <HiOutlineArchive className="text-2xl" />
            My Pokémons
          </Link>
        </li>
      </ul>
    </nav>
  );
}
