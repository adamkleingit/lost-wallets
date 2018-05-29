// @flow
import type { ActionCreator, Action } from 'types/redux.types';

export const USER_LABEL = 'user';
export const FETCH_USER_ACCOUNT = `[${USER_LABEL}] Fetch user account`;
export const SET_USER_ACCOUNT = `[${USER_LABEL}] Set user account`;

export const fetchUserAccount: ActionCreator = (): Action => ({
  type: FETCH_USER_ACCOUNT
});

export const setUserAccount: ActionCreator = (account): Action => ({
  type: SET_USER_ACCOUNT,
  payload: { account }
});
