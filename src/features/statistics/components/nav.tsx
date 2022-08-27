import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ROUTES = [
  { href: '/statistics/types', label: 'Types' },
  { href: '/statistics/stats', label: 'Base Stats' },
  { href: '/statistics/misc', label: 'Misc.' },
];

export default function Nav() {
  const { pathname } = useRouter();

  return (
    <nav className="flex border-b">
      {ROUTES.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'block bg-opacity-60 px-4 py-3',
            href === pathname && 'border-b-4 border-elm-electric font-semibold',
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
