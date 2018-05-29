// @flow
import { get, set } from 'lodash/fp';
import { handleActions } from 'redux-actions';
import web3 from 'web3';

import type { Action } from 'types/redux.types';
import type { Options, Guesses } from 'types/game.types';

import * as AT from 'actions/game.actions';

const findFirstEmptyIndex = (length, array) => {
  for (let i = 0; i < length; i++) {
    if (!array[i]) {
      return i;
    }
  }

  return length - 1;
};

export type GameState = {
  selectedOptions: Options,
  guesses: Guesses,
  colors: {
    [key: string]: string
  },
  guessPrice: number
};

const initialState: GameState = {
  selectedOptions: [],
  guesses: null,
  colors: {},
  guessPrice: 0
};

const gameReducer = handleActions(
  {
    [AT.SELECT_OPTION]: (state: GameState, action: Action): GameState => {
      const { option, answerLength } = action.payload || {};
      const emptyIndex = findFirstEmptyIndex(
        answerLength,
        state.selectedOptions
      );

      return set(['selectedOptions', emptyIndex.toString()], option, state);
    },

    [AT.UNSELECT_OPTION]: (state: GameState, action: Action): GameState => {
      const { index } = action.payload || {};

      return set(['selectedOptions', index], undefined, state);
    },

    [AT.CLEAR_SELECTION]: (state: GameState, action: Action): GameState =>
      set('selectedOptions', [], state),

    [AT.CLEAR_GAME]: (state: GameState, action: Action): GameState =>
      initialState,

    [AT.SET_GUESSES]: (state: GameState, action: Action): GameState =>
      set('guesses', get('payload.guesses', action), state),

    [AT.SET_COLORS]: (state: GameState, action: Action): GameState =>
      set('colors', get('payload.colors', action), state),

    [AT.SET_GUESS_PRICE]: (state: GameState, action: Action): GameState =>
      set(
        'guessPrice',
        Number(web3.utils.fromWei(get('payload.guessPrice', action), 'ether')),
        state
      )
  },
  initialState
);

export default gameReducer;
