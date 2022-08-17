import { ReactNode } from 'react';

import CustomStyles from './custom-styles';
import Header from './header';
import Nav from './nav';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <CustomStyles />
      <Header />
      <Nav />
      <main className="px-3.5 pt-8 pb-20 lg:px-6 lg:py-10">{children}</main>
    </>
  );
}
