import Link from 'next/link';
import {
  HiOutlineColorSwatch,
  HiOutlineInformationCircle,
  HiOutlinePresentationChartLine,
  HiOutlineViewGrid,
} from 'react-icons/hi';

import ReactIconAsImg from '../commons/react-icon-as-img';

export default function Nav() {
  return (
    <nav id="_nav">
      <ul id="_nav-inner">
        <li className="flex-1">
          <Link href="/" className="nav-link">
            <ReactIconAsImg icon={HiOutlineViewGrid} />
            Pokémons
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/compare" className="nav-link">
            <ReactIconAsImg icon={HiOutlineColorSwatch} />
            Compare
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/statistics" className="nav-link">
            <ReactIconAsImg icon={HiOutlinePresentationChartLine} />
            Statistics
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/about" className="nav-link">
            <ReactIconAsImg icon={HiOutlineInformationCircle} />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
