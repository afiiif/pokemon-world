import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaProductHunt } from 'react-icons/fa';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useIsomorphicLayoutEffect as useLayoutEffect } from 'react-power-ups';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.theme === 'dark') setDarkMode(true);
  }, []);

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
          <div className="-mt-1 inline-block -rotate-6 border border-white bg-gradient-to-br from-sky-600 to-pink-600 px-1.5 text-[9px] font-bold tracking-widest text-white lg:px-3 lg:text-base">
            AWESOME
          </div>
        </Link>

        <div className="flex items-center gap-1 self-center">
          <a
            href="https://www.producthunt.com/posts/pokemon-awesome"
            target="_blank"
            rel="noreferrer"
            title="Pokemon Awesome on Product Hunt"
            className="p-2 text-2xl text-[#ea532a]"
          >
            <span className="sr-only">Pokemon Awesome on Product Hunt</span>
            <FaProductHunt />
          </a>
          <a
            href="https://github.com/afiiif"
            title="Pokemon Awesome on GitHub"
            className="p-2 text-2xl dark:text-white"
          >
            <span className="sr-only">Pokemon Awesome on GitHub</span>
            <BsGithub />
          </a>
          <label
            htmlFor="darkmode-toggle"
            className="relative ml-2 inline-flex cursor-pointer items-center text-2xl"
            title="Toggle dark mode"
          >
            <input
              type="checkbox"
              id="darkmode-toggle"
              className="sr-only"
              checked={darkMode}
              onChange={({ target }) => {
                setDarkMode(target.checked);
                localStorage.theme = target.checked ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', target.checked);
              }}
            />
            <div className="h-7 w-11 rounded-full bg-elm-electric transition-colors dark:bg-slate-500" />
            <div className="absolute left-0 top-0 m-0.5 h-6 w-6 rounded-full bg-white transition-[left] dark:left-4" />
            <HiSun className="absolute top-0 left-0 m-0.5 opacity-100 transition-all dark:left-4 dark:opacity-0" />
            <HiMoon className="absolute top-0 left-0 m-0.5 opacity-0 transition-all dark:left-4 dark:text-typography-light dark:opacity-100" />
          </label>
          <Head>
            <meta
              name="theme-color"
              content={darkMode ? '#25303f' : '#ffffff'}
              key="meta:theme-color"
            />
          </Head>
        </div>
      </div>
    </header>
  );
}
