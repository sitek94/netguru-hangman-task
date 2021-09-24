import config from '../config';

const url = `https://${config.rapidApi.host}/words/?random=true`;

interface WordsApi {
  getRandomWord(): Promise<string>;
}

export class ProdApi implements WordsApi {
  async getRandomWord() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': config.rapidApi.key,
        'x-rapidapi-host': config.rapidApi.host,
      },
    });
    const { word } = await response.json();
    return word as string;
  }
}

export class DevApi implements WordsApi {
  constructor(private words: string[]) {}

  private index = 0;

  /**
   * Each call returns a next word from the list of available words, when there
   * no more words, starts over from 1.
   */
  async getRandomWord() {
    return this.words[this.index++ % this.words.length];
  }
}
