import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'fonts/fonts.scss';
import 'index.scss';

import { DevApi } from './api/words';

const api = new DevApi(['maciek', 'a', 'mac-iek']);

ReactDOM.render(
  <React.StrictMode>
    <App api={api} />
  </React.StrictMode>,
  document.getElementById('root'),
);
