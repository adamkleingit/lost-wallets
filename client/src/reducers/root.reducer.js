// @flow
import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import games from 'reducers/games.reducer';
import game from 'reducers/game.reducer';
import user from 'reducers/user.reducer';
import errorModal from 'reducers/error-modal.reducer';

export const reducersMap = {
  network,
  games,
  game,
  user,
  errorModal
};

export default combineReducers(reducersMap);
