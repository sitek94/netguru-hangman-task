import config from '../config';

const url = `https://${config.rapidApi.host}/words/?random=true`;

export interface WordsApi {
  getRandomWord(): Promise<string>;
}

const prodApi: WordsApi = {
  async getRandomWord() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': config.rapidApi.key,
        'x-rapidapi-host': config.rapidApi.host,
      },
    });
    const { word } = await response.json();
    if (typeof word === 'string') {
      return word;
    }
    throw new Error(`☠️ There something's wrong with the "word"`);
  },
};

function createDevApi(words: string[]): WordsApi {
  let index = 0;
  return {
    async getRandomWord() {
      return words[index++ % words.length];
    },
  };
}

export { prodApi, createDevApi };
