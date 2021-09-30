import { getBoolEnv, getEnv } from 'utils/get-env';

import pkg from '../../package.json';

const env = process.env.NODE_ENV;

export const wordsApi = {
  key: getEnv('REACT_APP_WORDS_API_KEY'),
  host: getEnv('REACT_APP_WORDS_API_HOST'),
  url: getEnv('REACT_APP_WORDS_API_URL'),
};

export const githubProfileUrl = getEnv('REACT_APP_MY_PROFILE_URL');

export const isProduction = env === 'production';
export const isDevelopment = env === 'development';
export const isTest = env === 'test';

export const isMSWEnabled = getBoolEnv('REACT_APP_ENABLE_MSW');

const { pathname } = new URL(pkg.homepage);

export const project = {
  name: pkg.name,
  repoUrl: githubProfileUrl + '/' + pkg.name,
  pathname,
};
