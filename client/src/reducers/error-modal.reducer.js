// @flow
import { handleActions } from 'redux-actions';

import type { Action } from 'types/redux.types';

import * as AT from 'actions/error-modal.actions';

export type ErrorModalState = {
  open: boolean,
  type: string,
  header: string,
  message: string
};

const initialState: ErrorModalState = {
  open: false,
  type: '',
  header: '',
  message: ''
};

const errorModalReducer = handleActions(
  {
    [AT.SHOW_ERROR_MODAL]: (
      state: ErrorModalState,
      action: Action
    ): ErrorModalState => ({
      ...state,
      ...action.payload
    })
  },
  initialState
);

export default errorModalReducer;
