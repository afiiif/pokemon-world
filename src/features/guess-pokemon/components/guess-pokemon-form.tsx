import { Dispatch, FormEventHandler, SetStateAction, useRef } from 'react';
import { useCountDown, useUpdateEffect } from 'react-power-ups';

import { usePokemonNames } from '@/api/queries/pokemon-names';

import { ANSWER_STATE } from '../constants';

export type GuessPokemonState = {
  currentPokemonIndex: number;
  imgClassName: string;
  answerState: string;
};

type Props = {
  state: GuessPokemonState;
  setState: Dispatch<SetStateAction<GuessPokemonState>>;
  startGame: () => void;
};

export default function GuessPokemonForm({ state, setState, startGame }: Props) {
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
    setState((prev) => ({
      ...prev,
      answerState: isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG,
      imgClassName: prev.imgClassName.replace('brightness-0', '').replace('grayscale', ''),
    }));
    timerAction.start();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="relative pb-2">
        {answerState !== ANSWER_STATE.VOID && (
          <div className="absolute -mt-10 text-gray-500">
            ⏳ Loading new Pokémon in {timeLeft / 1000}s
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className="mr-2 mb-2 w-full rounded-md border px-3 py-2 dark:text-typography-light md:w-auto"
          placeholder="The Pokémon name is ..."
        />
        <button type="submit" className="w-full rounded-md bg-elm-electric py-2 px-3 md:w-auto">
          Submit
        </button>
      </form>

      {answerState === ANSWER_STATE.CORRECT && (
        <div className="text-green-500">
          ✅ Correct, that was <b>{currentPokemonName}</b>
        </div>
      )}
      {answerState === ANSWER_STATE.WRONG && (
        <div className="text-rose-500">
          🙅‍♀️ Wrong, that was <b>{currentPokemonName}</b>
        </div>
      )}
    </>
  );
}
