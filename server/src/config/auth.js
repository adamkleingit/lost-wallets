import parameters from 'config/parameters';

/* eslint-disable prefer-arrow-callback */
const authPlugin = {
  name: 'auth',
  register: server => {
    server.auth.strategy('jwt', 'jwt', {
      key: parameters.JWT_SECRET,
      validate: async decoded => ({ isValid: true, decoded }),
      verifyOptions: { algorithms: ['HS256'] },
      errorFunc: context => ({ ...context, scheme: 401 })
    });

    server.auth.default('jwt');
  }
};
/* eslint-enable prefer-arrow-callback */

export default authPlugin;
