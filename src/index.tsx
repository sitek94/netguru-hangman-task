import 'fonts/fonts.scss';
import 'index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { createDevApi, prodApi } from 'api/words';

import App from './components/App/App';
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
