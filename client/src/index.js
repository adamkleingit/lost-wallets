import React from 'react';
import ReactDOM from 'react-dom';

import 'index.scss';

import App from 'components/app';
// import registerServiceWorker from './register-service-worker';

if (process.env.NODE_ENV === 'development') {
  require('components/debug/debug-menu');
  const Mimic = require('mimic').default;

  Mimic.setAppName('LostWallets');
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
