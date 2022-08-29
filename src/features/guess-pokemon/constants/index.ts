export const ANSWER_STATE = {
  VOID: 'void',
  CORRECT: 'correct',
  WRONG: 'WRONG',
};

export const LEVELS = [
  { id: 1, name: 'Easy' },
  { id: 2, name: 'Normal' },
  { id: 3, name: 'Hard' },
];

export const ROTATION_CLASSNAME = [
  '',
  'rotate-45',
  'rotate-90',
  'rotate-180',
  '-rotate-45',
  '-rotate-90',
  '-rotate-180',
];

export const SCORING_BY_LEVEL = {
  1: {
    [ANSWER_STATE.CORRECT]: 1,
    [ANSWER_STATE.WRONG]: 0,
  },
  2: {
    [ANSWER_STATE.CORRECT]: 3,
    [ANSWER_STATE.WRONG]: -1,
  },
  3: {
    [ANSWER_STATE.CORRECT]: 8,
    [ANSWER_STATE.WRONG]: -2,
  },
};
