// @flow
import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import * as AT from 'actions/network.actions';
import type { Action } from 'types/redux.types';

export type NetworkState = {
  [key: string]: number
};

const initialState: NetworkState = {};

const networkReducer = handleActions(
  {
    [AT.START_NETWORK]: (
      state: NetworkState,
      { payload: { networkLabel } = {} }: Action
    ): NetworkState =>
      set(
        networkLabel,
        state[networkLabel] ? state[networkLabel] + 1 : 1,
        state
      ),

    [AT.END_NETWORK]: (
      state: NetworkState,
      { payload: { networkLabel } = {} }: Action
    ): NetworkState =>
      set(
        networkLabel,
        state[networkLabel] ? state[networkLabel] - 1 : 0,
        state
      )
  },
  initialState
);

export default networkReducer;
