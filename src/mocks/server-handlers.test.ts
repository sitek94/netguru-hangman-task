import { wordsApi } from 'config';

test('server should return 400 on invalid request', async () => {
  const { status } = await fetch(wordsApi.url);

  expect(status).toBe(400);
});
