import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import JWTAuth from 'hapi-auth-jwt2';
import Path from 'path';

import parameters from 'config/parameters';
import Routes from 'routes';
import Documentation from 'config/documentation';
import HttpRequest from 'config/http-request';
import Database from 'config/db/plugin';
import Auth from 'config/auth';
import { getContractEventsJob } from 'config/subscription';

const server = new Hapi.Server({
  port: process.env.PORT || parameters.PORT,
  router: { stripTrailingSlash: true },
  state: { isSameSite: 'Lax' },
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../../../client/build')
    },

    cors: {
      origin: ['*'],
      credentials: true
    },
    state: {
      failAction: 'ignore'
    }
  }
});

const plugins = [
  Inert,
  Vision,
  Documentation,
  HttpRequest,
  JWTAuth,
  Auth,
  Database,
  Routes
];

const getServer = async () => {
  await server.register(plugins);

  const contractEventsJob = await getContractEventsJob();
  contractEventsJob.start();

  return server;
};

export { getServer };
