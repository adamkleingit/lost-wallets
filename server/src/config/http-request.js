import { request } from 'axios';
import { omit } from 'lodash/fp';
import UrlJoin from 'url-join';

import parameters from 'config/parameters';

/* eslint-disable prefer-arrow-callback */
const httpRequestPlugin = {
  name: 'httpRequest',
  register: server => {
    server.decorate('request', 'httpRequest', async function httpRequest(
      options
    ) {
      const config = {
        url: options.explicitUrl
          ? options.url
          : UrlJoin(parameters.API_URL, options.url),
        ...omit('url')(options)
      };
      /* eslint-disable no-console */
      console.log(`http-request: ${JSON.stringify(config)}`);
      /* eslint-enable no-console */
      return request(config);
    });

    server.decorate(
      'toolkit',
      'httpRequestException',
      function httpRequestException({ statusText, status, data }) {
        const response = data ? data.message : statusText;
        return this.response(response).code(status);
      }
    );
  }
};
/* eslint-enable prefer-arrow-callback */

export default httpRequestPlugin;
