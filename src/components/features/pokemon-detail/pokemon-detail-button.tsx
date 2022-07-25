import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export type CatchState = 'void' | 'catching' | 'success' | 'fail';

const CATCH_STATE_OPTION = {
  void: ['Catch!', null],
  catching: ['Catching...', null, 'text-gray-500'],
  success: ['Caught!', '🎉', 'text-emerald-600'],
  fail: ['Failed', '😓', 'text-red-500'],
};

type Props = {
  catchState: CatchState;
  setCatchState: Dispatch<SetStateAction<CatchState>>;
};

export default function PokemonDetailButton({ catchState, setCatchState }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onCatch = () => {
    setCatchState('catching');
    timeoutRef.current = setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      const [status, timeOut]: [CatchState, number] = isSuccess ? ['success', 2800] : ['fail', 800];
      setCatchState(status);
      timeoutRef.current = setTimeout(() => {
        setCatchState('void');
      }, timeOut);
    }, 5600);
  };

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    [],
  );

  const [label, emoji, className] = CATCH_STATE_OPTION[catchState];

  return (
    <button
      type="button"
      className={clsx(
        'relative h-14 w-full rounded-full bg-white py-3 px-10 text-gray-700 shadow-md active:translate-y-1 disabled:pointer-events-none md:pl-[4.25rem]',
        className,
      )}
      onClick={onCatch}
      disabled={catchState !== 'void'}
    >
      <div
        className={clsx(
          'absolute top-1 left-1 flex items-center justify-center',
          catchState !== 'void' && 'pokeball-animate',
        )}
      >
        <div
          key={catchState}
          className={clsx(
            'pokeball',
            catchState === 'catching' && 'pokeball-shake',
            catchState === 'fail' && 'pokeball-fade-out',
            catchState === 'success' && 'pokeball-fade-out-delayed',
          )}
        >
          <div className="pokeball-button" />
        </div>
        {catchState === 'catching' && (
          <>
            <div className="pokeball-explosion" />
            <div className="pokeball-explosion" />
          </>
        )}
        {catchState === 'success' && <div className="pokeball-caught-info">Caught!</div>}
      </div>
      {label}
      <div className="absolute top-2.5 left-4 text-3xl">{emoji}</div>
    </button>
  );
}
