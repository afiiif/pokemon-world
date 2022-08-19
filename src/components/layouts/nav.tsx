import Link from 'next/link';
import {
  HiOutlineColorSwatch,
  HiOutlineInformationCircle,
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
          <Link href="/about" className="nav-link">
            <HiOutlineInformationCircle className="text-2xl" />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
