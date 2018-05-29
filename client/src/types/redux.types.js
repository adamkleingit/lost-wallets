// @flow
import type { NetworkState } from 'reducers/network.reducer';
import type { GamesState } from 'reducers/games.reducer';
import type { GameState } from 'reducers/game.reducer';
import type { UserState } from 'reducers/user.reducer';
import type { ErrorModalState } from 'reducers/error-modal.reducer';

export type Action = {|
  type: string,
  payload?: any,
  meta?: {},
  error?: any
|};

/* eslint-disable no-use-before-define */
export type ApiAction = {|
  type: string,
  payload?: {
    networkLabel?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
    data?: {},
    baseUrl?: string,
    path?: string,
    onSuccess?: (data: any) => Action | Action[],
    onError?: (error: any) => Action | Action[]
  },
  meta?: {
    api: boolean
  },
  error?: any
|};

/* eslint-enable no-use-before-define */
export type ActionCreator = (...any) => Action;
export type ApiActionCreator = (...any) => ApiAction;
export type Dispatch = (action: Action | ApiAction) => any;

export type GetState = () => State;
type Next = (action: Action | ApiAction) => any;
type Store = {
  getState: GetState,
  dispatch: Dispatch
};

export type Middleware = (
  store: Store
) => (next: Next) => (action: Action | ApiAction) => any;

export type State = {
  network: NetworkState,
  games: GamesState,
  game: GameState,
  user: UserState,
  errorModal: ErrorModalState
};
