// @flow
import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import * as AT from 'actions/user.actions';

export type UserState = {
  account: string
};

const initialState: UserState = {
  account: ''
};

const userReducer = handleActions(
  {
    [AT.SET_USER_ACCOUNT]: (state, action) =>
      set('account', action.payload.account, state)
  },
  initialState
);

export default userReducer;
