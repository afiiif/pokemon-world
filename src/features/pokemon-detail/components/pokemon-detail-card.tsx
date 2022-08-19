import { ReactNode } from 'react';

type Props = {
  heading?: string;
  children: ReactNode;
};

export default function PokemonDetailCard({ heading, children }: Props) {
  return (
    <div className="mb-6 rounded-md bg-white p-3.5 shadow-md dark:bg-dark-card md:p-5">
      {heading && <h2 className="pb-2.5 text-xl font-bold">{heading}</h2>}
      {children}
    </div>
  );
}
