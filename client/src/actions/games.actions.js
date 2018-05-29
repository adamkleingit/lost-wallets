// @flow
import type { Games } from 'types/games.types';
import type { ActionCreator, ApiActionCreator } from 'types/redux.types';

export const GAMES_LABEL = 'games';
export const FETCH_GAMES = `[${GAMES_LABEL}] Fetch games`;
export const SET_GAMES = `[${GAMES_LABEL}] Set games`;

/*
* Games API action
*/
export const fetchGames: ApiActionCreator = () => ({
  type: FETCH_GAMES,
  payload: {
    networkLabel: GAMES_LABEL,
    method: 'GET',
    path: 'games',
    onSuccess: setGames
  },
  meta: {
    api: true
  }
});

export const setGames: ActionCreator = (games: Games) => ({
  type: SET_GAMES,
  payload: {
    games
  }
});
