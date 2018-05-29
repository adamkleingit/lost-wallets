// @flow
import { get, castArray, compact } from 'lodash/fp';
import urljoin from 'url-join';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';

import type { Middleware } from 'types/redux.types';
// import type { Middleware } from 'redux'; doesn't work?

declare var process: any;

export const BASE_URL: string = process.env.REACT_APP_BASE_URL;

const apiMiddleware: Middleware = ({ dispatch, getState }) => {
  const dispatchActions = actions => {
    compact(castArray(actions)).forEach(action => dispatch(action));
  };

  return next => action => {
    if (!get('meta.api', action)) {
      return next(action);
    }
    const { payload } = action;
    const { path, baseUrl, onSuccess, onError } = payload || {};
    const { networkLabel, data, method = 'GET' } = payload || {};
    const headers = {};
    const requestUrl = urljoin(baseUrl || BASE_URL, path);

    next(action);

    dispatch(startNetwork(networkLabel));

    apiUtils
      .request({ method, url: requestUrl, data, headers })
      .then(({ body }) => {
        if (onSuccess) {
          dispatchActions(onSuccess(body));
        }

        dispatch(endNetwork(networkLabel));
      })
      .catch(error => {
        console.error('API error', error, action);

        if (get('response.status', error) === 401) {
          console.log('Error during API request: ', error);
        }

        if (onError) {
          dispatchActions(onError(error));
        }
        dispatch(endNetwork(networkLabel));
      });
  };
};

export default apiMiddleware;
