import { helloWorld, getPosts, getUser } from 'routes/basic';
import { login, register as registerRoute } from 'routes/auth';
import { getGames } from 'routes/games';
import { getGuesses } from 'routes/guesses';

const routesPlugin = {
  name: 'routes',
  register: server => {
    server.route([
      { method: 'GET', path: '/api/hello/{name}', config: helloWorld },
      { method: 'POST', path: '/api/register', config: registerRoute },
      { method: 'POST', path: '/api/login', config: login },
      { method: 'GET', path: '/api/posts', config: getPosts },
      { method: 'GET', path: '/api/user', config: getUser },
      { method: 'GET', path: '/api/games', config: getGames },
      { method: 'GET', path: '/api/guesses/{gameId}', config: getGuesses },
      {
        method: 'GET',
        path: '/game/{param*}',
        config: {
          auth: false,
          handler: {
            file: {
              path: 'index.html'
            }
          }
        }
      },
      {
        method: 'GET',
        path: '/{param*}',
        config: {
          auth: false,
          handler: {
            directory: {
              path: '.',
              index: ['index.html']
            }
          }
        }
      }
    ]);
  }
};

export default routesPlugin;
