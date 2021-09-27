import { getBoolEnv, getEnv } from 'utils/get-env';

import pkg from '../../package.json';

const index = process.env.NODE_ENV;

export const wordsApi = {
  key: getEnv('REACT_APP_WORDS_API_KEY'),
  host: getEnv('REACT_APP_WORDS_API_HOST'),
  url: getEnv('REACT_APP_WORDS_API_URL'),
};

export const githubProfileUrl = getEnv('REACT_APP_MY_PROFILE_URL');

export const isProduction = index === 'production';
export const isDevelopment = index === 'development';
export const isTest = index === 'test';

export const isMSWEnabled = getBoolEnv('REACT_APP_ENABLE_MSW');

const { pathname } = new URL(pkg.homepage);

export const project = {
  name: pkg.name,
  repoUrl: githubProfileUrl + '/' + pkg.name,
  pathname,
};
