import { BsBackspace } from 'react-icons/bs';
import { useWindowEvent } from 'react-power-ups';

const KEYBOARD_KEYS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

type Props = {
  onClickKey: (key: string) => void;
  onClickBackSpace: (key: string) => void;
  onClickEnter: (key: string) => void;
};

export default function Keyboard({ onClickKey, onClickBackSpace, onClickEnter }: Props) {
  useWindowEvent('keydown', (evt) => {
    const key = evt.key.toLowerCase();
    if (/^[\d a-z-]$/.test(key)) onClickKey(key);
    else if (key === 'backspace') onClickBackSpace(key);
    else if (key === 'enter') onClickEnter(key);
  });

  return (
    <div className="grid grid-cols-[repeat(22,_minmax(0,_1fr))] gap-1 text-center">
      {KEYBOARD_KEYS[0].map((key) => (
        <button
          key={key}
          type="button"
          className="col-span-2 rounded bg-elm-undefined py-4 font-semibold uppercase"
          onClick={() => onClickKey(key)}
        >
          {key}
        </button>
      ))}
      <div />
      {KEYBOARD_KEYS[1].map((key) => (
        <button
          key={key}
          type="button"
          className="col-span-2 rounded bg-elm-undefined py-4 font-semibold uppercase"
          onClick={() => onClickKey(key)}
        >
          {key}
        </button>
      ))}
      <div className="col-span-2" />
      {KEYBOARD_KEYS[2].map((key) => (
        <button
          key={key}
          type="button"
          className="col-span-2 rounded bg-elm-undefined py-4 font-semibold uppercase"
          onClick={() => onClickKey(key)}
        >
          {key}
        </button>
      ))}
      <button
        type="button"
        className="col-span-2 rounded bg-elm-fighting py-4 font-semibold text-white"
        onClick={() => onClickBackSpace('backspace')}
      >
        <BsBackspace className="mx-auto text-2xl" />
      </button>
      <button
        type="button"
        className="col-span-3 rounded bg-elm-grass py-4 font-semibold"
        onClick={() => onClickEnter('enter')}
      >
        Enter
      </button>
      {KEYBOARD_KEYS[3].map((key) => (
        <button
          key={key}
          type="button"
          className="col-span-2 rounded bg-elm-undefined py-4 font-semibold uppercase"
          onClick={() => onClickKey(key)}
        >
          {key}
        </button>
      ))}
      <button
        type="button"
        className="col-span-5 rounded bg-elm-water py-4 font-semibold"
        onClick={() => onClickKey(' ')}
      >
        SPACE
      </button>
    </div>
  );
}
