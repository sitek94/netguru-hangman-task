import { rest } from 'msw';
import { wordsApi } from 'config';

let index = 0;
export const words = [
  'definitely-too-long-word',
  'lotr',
  'ale',
  'pozdro',
  'aaaa',
  'hello',
  'primary',
  'secondary',
];

export const serverHandlers = [
  rest.get(wordsApi.url, (req, res, ctx) => {
    const query = req.url.searchParams;
    const random = query.get('random');

    if (random) {
      /**
       * On each request gets next word from the list. When no more words, starts from
       * the beginning.
       */
      const word = words[index++ % words.length];

      return res(
        ctx.json({
          word,
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: 'Invalid request',
      }),
    );
  }),
];

export const getRandomWordMock = {
  mockSuccess(word: string) {
    return rest.get(wordsApi.url, (req, res, ctx) => {
      return res(
        ctx.json({
          word,
        }),
      );
    });
  },
  mockSuccesses(words: string[]) {
    let index = 0;

    return rest.get(wordsApi.url, (req, res, ctx) => {
      const word = words[index++ % words.length];
      return res(
        ctx.json({
          word,
        }),
      );
    });
  },
  mockError() {
    return rest.get(wordsApi.url, (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Error' }));
    });
  },
};
