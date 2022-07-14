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
    <nav className="fixed bottom-0 z-10 w-full border-t bg-white lg:relative lg:col-start-2 lg:h-full lg:min-h-[calc(100vh_-_80px)] lg:border-r lg:border-t-0 lg:bg-transparent">
      <ul className="flex gap-2 p-2 text-[10px] lg:sticky lg:top-20 lg:flex-col lg:py-12 lg:px-6 lg:text-base">
        <li className="flex-1">
          <Link href="/" className="flex w-full flex-col items-center lg:flex-row lg:gap-2 lg:py-2">
            <ReactIconAsImg icon={HiOutlineViewGrid} />
            Pokémons
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/compare"
            className="flex w-full flex-col items-center lg:flex-row lg:gap-2 lg:py-2"
          >
            <ReactIconAsImg icon={HiOutlineColorSwatch} />
            Compare
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/statistics"
            className="flex w-full flex-col items-center lg:flex-row lg:gap-2 lg:py-2"
          >
            <ReactIconAsImg icon={HiOutlinePresentationChartLine} />
            Statistics
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/about"
            className="flex w-full flex-col items-center lg:flex-row lg:gap-2 lg:py-2"
          >
            <ReactIconAsImg icon={HiOutlineInformationCircle} />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
