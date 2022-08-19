import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  heading?: string;
  className?: string;
  children: ReactNode;
};

export default function Card({ heading, className, children }: Props) {
  return (
    <div
      className={clsx(
        'mb-2.5 rounded-md bg-white p-3.5 shadow-md dark:bg-dark-card md:p-4',
        className,
      )}
    >
      {heading && <h2 className="pb-2.5 font-bold">{heading}</h2>}
      {children}
    </div>
  );
}
