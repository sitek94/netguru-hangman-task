import 'assets/fonts/fonts.scss';
import 'assets/sass/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App/App';

// import { worker } from 'test/server';

// Start the mocking conditionally.
// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('mocks/dev-worker');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
