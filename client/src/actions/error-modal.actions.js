// @flow
import type { ActionCreator, Action } from 'types/redux.types';

export const ERROR_MODAL_LABEL = 'error-modal';
export const SHOW_ERROR_MODAL = `[${ERROR_MODAL_LABEL}] Show error modal`;

export const showErrorModal: ActionCreator = (
  open: boolean,
  type: string,
  header: string,
  message: string
): Action => ({
  type: SHOW_ERROR_MODAL,
  payload: { open, type, header, message }
});
