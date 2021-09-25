import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'fonts/fonts.scss';
import 'index.scss';

import { prodApi, createDevApi } from './api/words';
import config from './config';

const api = config.isProd
  ? prodApi
  : createDevApi(['maciek', 'a', 'word', 'test']);

ReactDOM.render(
  <React.StrictMode>
    <App api={api} />
  </React.StrictMode>,
  document.getElementById('root'),
);
