import { getEnv } from './get-env';

test('getEnv returns existing ENV variable', () => {
  expect(getEnv('REACT_APP_WORDS_API_URL')).toBeTruthy();
});

test('getEnv throws if ENV variable does not exist', () => {
  expect(() => getEnv('CANT_TOUCH_THIS')).toThrow();
});
