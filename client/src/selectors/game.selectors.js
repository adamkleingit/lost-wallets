// @flow
import { createSelector } from 'reselect';
import { filter, reduce, find } from 'lodash/fp';

import type { State } from 'types/redux.types';
import type { GameState } from 'reducers/game.reducer';

const gameSelector = (state: State): GameState => state.game;

export const getUsersWithAwards = createSelector(
  gameSelector,
  (game: GameState) => {
    const guessesWithAwards = filter(
      guess => Number(guess.award),
      game.guesses
    );
    const awardees = reduce(
      (currentAwardees, guess) => ({
        ...currentAwardees,
        [guess.exact]: guess.user
      }),
      {},
      guessesWithAwards
    );

    return awardees;
  }
);

export const isGameHacked = (state: State, answerLength: number): boolean =>
  createSelector(
    gameSelector,
    (game: GameState) => !!find({ exact: answerLength }, game.guesses)
  )(state);
