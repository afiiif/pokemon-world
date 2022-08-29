import { Dispatch, SetStateAction, useReducer } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useCountDown, useUpdateEffect } from 'react-power-ups';

import { usePokemonNames } from '@/api/queries/pokemon-names';
import Keyboard from '@/components/commons/keyboard';
import { playAudio } from '@/utils/audio';

import { ANSWER_STATE, SCORING_BY_LEVEL } from '../constants';

export type GuessPokemonState = {
  currentPokemonIndex: number;
  imgClassName: string;
  answerState: string;
};

type Props = {
  level: number;
  state: GuessPokemonState;
  setState: Dispatch<SetStateAction<GuessPokemonState>>;
  startGame: () => void;
  setScore: Dispatch<SetStateAction<number>>;
};

const inputReducer = (prev: string, nextValue: string | null) => {
  if (nextValue === null) return '';
  if (nextValue === 'backspace') return prev.slice(0, -1);
  return prev.length < 30 ? `${prev}${nextValue}` : prev;
};

export default function GuessPokemonForm({ level, state, setState, startGame, setScore }: Props) {
  const { currentPokemonIndex, answerState } = state;

  const pokemonNames = usePokemonNames().data!;
  const currentPokemonName = pokemonNames[currentPokemonIndex];

  const [inputValue, dispatchInputValue] = useReducer(inputReducer, '');

  const [timeLeft, timerAction] = useCountDown({ defaultDuration: 5000 });
  useUpdateEffect(() => {
    if (!timeLeft) {
      dispatchInputValue(null);
      startGame();
    }
  }, [timeLeft]);

  const onSubmit = () => {
    const submittedName = inputValue.trim();
    if (!submittedName || answerState !== ANSWER_STATE.VOID) {
      return;
    }

    const isCorrect = submittedName === currentPokemonName.toLowerCase();
    const gainedScore =
      SCORING_BY_LEVEL[level as keyof typeof SCORING_BY_LEVEL][
        isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG
      ];
    setScore((prev) => Math.max(0, prev + gainedScore));
    setState((prev) => ({
      ...prev,
      answerState: isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG,
      imgClassName: prev.imgClassName
        .replace('brightness-0 opacity-70 dark:invert', '')
        .replace('grayscale', ''),
    }));
    playAudio(isCorrect ? 'acute.mp3' : 'blop.mp3');
    timerAction.start();
  };

  return (
    <>
      <div className="relative flex justify-center text-center">
        {answerState === ANSWER_STATE.CORRECT && (
          <div className="absolute -mt-12 rounded-full bg-green-500 py-1 px-5 text-lg text-white dark:bg-green-600">
            🥳 &nbsp;Correct, that was <b>{currentPokemonName}</b>
          </div>
        )}
        {answerState === ANSWER_STATE.WRONG && (
          <div className="absolute -mt-12 rounded-full bg-rose-500 py-1 px-5 text-lg text-white dark:bg-rose-600">
            🙅‍♀️ &nbsp;Wrong, that was <b>{currentPokemonName}</b>
          </div>
        )}
      </div>

      <section className="2xl:col-start-2 2xl:row-start-1 2xl:-mr-20 2xl:self-end 2xl:pl-12">
        <div className="mx-auto max-w-md px-8">
          <input
            type="text"
            value={inputValue}
            disabled
            className="mb-6 w-full border-b-4 border-b-elm-electric bg-transparent py-1.5 text-center text-xl uppercase"
          />
        </div>
        <div className="relative mx-auto max-w-2xl px-2">
          <Keyboard
            onClickKey={dispatchInputValue}
            onClickBackSpace={dispatchInputValue}
            onClickEnter={onSubmit}
          />
          {timeLeft > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-dark-base/80">
              ⏳ Loading new Pokémon in {timeLeft / 1000}s
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-1.5 px-3 py-5 opacity-60">
          <HiOutlineInformationCircle className="flex-none text-lg" /> You can type on your keyboard
          directly
        </div>
      </section>
    </>
  );
}
