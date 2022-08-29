import { Dispatch, FormEventHandler, SetStateAction, useRef } from 'react';
import { useCountDown, useUpdateEffect } from 'react-power-ups';

import { usePokemonNames } from '@/api/queries/pokemon-names';
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

export default function GuessPokemonForm({ level, state, setState, startGame, setScore }: Props) {
  const { currentPokemonIndex, answerState } = state;

  const pokemonNames = usePokemonNames().data!;
  const currentPokemonName = pokemonNames[currentPokemonIndex];

  const [timeLeft, timerAction] = useCountDown({ defaultDuration: 5000 });
  useUpdateEffect(() => {
    if (!timeLeft) {
      startGame();
    }
  }, [timeLeft]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const submittedName = inputRef.current!.value.toLowerCase().trim();
    if (!submittedName || answerState !== ANSWER_STATE.VOID) {
      return;
    }

    const isCorrect = submittedName === currentPokemonName.toLowerCase();
    inputRef.current!.value = '';
    const gainedScore =
      SCORING_BY_LEVEL[level as keyof typeof SCORING_BY_LEVEL][
        isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG
      ];
    setScore((prev) => Math.max(0, prev + gainedScore));
    setState((prev) => ({
      ...prev,
      answerState: isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG,
      imgClassName: prev.imgClassName.replace('brightness-0', '').replace('grayscale', ''),
    }));
    playAudio(isCorrect ? 'acute.mp3' : 'blop.mp3');
    timerAction.start();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="relative pb-2">
        {answerState === ANSWER_STATE.CORRECT && (
          <div className="absolute -mt-11 text-lg text-green-500">
            ✅ Correct, that was <b>{currentPokemonName}</b>
          </div>
        )}
        {answerState === ANSWER_STATE.WRONG && (
          <div className="absolute -mt-11 text-lg text-rose-500">
            🙅‍♀️ Wrong, that was <b>{currentPokemonName}</b>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className="mr-2 mb-2 w-full rounded-md border px-3 py-2 dark:text-typography-light md:w-96"
          placeholder="The Pokémon name is ..."
        />
        <button type="submit" className="w-full rounded-md bg-elm-electric py-2 px-6 md:w-auto">
          {answerState === ANSWER_STATE.VOID ? 'Submit' : 'Waiting...'}
        </button>
      </form>

      {answerState !== ANSWER_STATE.VOID && (
        <div className="text-gray-500">⏳ Loading new Pokémon in {timeLeft / 1000}s</div>
      )}
    </>
  );
}
