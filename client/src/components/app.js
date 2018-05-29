// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import Layout from 'components/layout/layout';
import Games from 'components/games';
import Game from 'components/game/game';
import ErrorModal from 'components/error-modal';

class App extends React.Component<{||}> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Layout>
              <ErrorModal />
              <Route exact path="/" name="games" component={Games} />
              <Route path="/game/:id" name="game" component={Game} />
            </Layout>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
