import { getBoolEnv, getEnv } from './get-env';

test('getEnv returns existing ENV variable', () => {
  expect(getEnv('REACT_APP_WORDS_API_URL')).toBeTruthy();
});

test('getEnv throws if ENV variable does not exist', () => {
  expect(() => getEnv('REACT_APP_CANT_TOUCH_THIS')).toThrow();
});

test('geBooltEnv throws if ENV variable is neither "true" nor "false"', () => {
  expect(() => getBoolEnv('REACT_APP_MY_PROFILE_URL')).toThrow();
});
