// @flow
import { get, set, keyBy } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import type { Action } from 'types/redux.types';
import type { GamesMap } from 'types/games.types';

import * as AT from 'actions/games.actions';

export type GamesState = {|
  list: GamesMap
|};

const initialState: GamesState = {
  list: {}
};

const gamesReducer = handleActions(
  {
    [AT.SET_GAMES]: (state: GamesState, action: Action): GamesState =>
      set('list', keyBy('id', get('payload.games', action)), state)
  },
  initialState
);

export default gamesReducer;
