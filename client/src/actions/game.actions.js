// @flow
import type { ActionCreator, Action } from 'types/redux.types';
import type { Option } from 'types/game.types';
import type { ApiActionCreator } from 'types/redux.types';
import type { Guesses } from 'types/game.types';

import { MAIN_CONTRACT_NAME, WEB3_CALL } from 'constants/web3.constants';

export const GAME_LABEL = 'game';
export const SELECT_OPTION = `[${GAME_LABEL}] Select option`;
export const UNSELECT_OPTION = `[${GAME_LABEL}] Unselect option`;
export const CLEAR_SELECTION = `[${GAME_LABEL}] Clear selection`;
export const FETCH_GUESSES = `[${GAME_LABEL}] Fetch guesses`;
export const SET_GUESSES = `[${GAME_LABEL}] Set guesses`;
export const CLEAR_GAME = `[${GAME_LABEL}] Clear game`;
export const SET_COLORS = `[${GAME_LABEL}] Set colors`;
export const SET_GUESS_PRICE = `[${GAME_LABEL}] Set guess price`;

export const selectOption: ActionCreator = (
  option: Option,
  answerLength: number
): Action => ({
  type: SELECT_OPTION,
  payload: { option, answerLength }
});

export const unselectOption: ActionCreator = (index: number) => ({
  type: UNSELECT_OPTION,
  payload: { index }
});

export const clearSelection: ActionCreator = () => ({
  type: CLEAR_SELECTION
});

export const clearGame: ActionCreator = () => ({
  type: CLEAR_GAME
});

export const fetchGuesses: ApiActionCreator = (gameId: number) => ({
  type: FETCH_GUESSES,
  payload: {
    networkLabel: GAME_LABEL,
    method: 'GET',
    path: `guesses/${gameId}`,
    onSuccess: setGuesses
  },
  meta: {
    api: true
  }
});

export const setGuesses: ActionCreator = (guesses: Guesses) => ({
  type: SET_GUESSES,
  payload: {
    guesses
  }
});

export const setColors: ActionCreator = colors => ({
  type: SET_COLORS,
  payload: {
    colors
  }
});

export const getGuessPrice = (gameId: number) => ({
  type: WEB3_CALL,
  payload: {
    contractName: MAIN_CONTRACT_NAME,
    method: 'getGuessPrice',
    params: [gameId],
    onSuccess: setGuessPrice
  }
});

export const setGuessPrice: ActionCreator = guessPrice => ({
  type: SET_GUESS_PRICE,
  payload: { guessPrice }
});
