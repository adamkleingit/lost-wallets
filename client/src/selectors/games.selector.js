// @flow
import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

import type { State } from 'types/redux.types';
import type { GamesState } from 'reducers/games.reducer';
import type { Game } from 'types/games.types';

const gamesSelector = (state: State): GamesState => state.games;

export const getGame = (state: State, gameId: number): Game =>
  createSelector(gamesSelector, (games: GamesState) =>
    get(gameId.toString(), games.list)
  )(state);
