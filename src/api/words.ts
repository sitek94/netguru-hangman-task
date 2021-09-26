import { wordsApi } from 'config';
import { MAX_WORD_LENGTH } from 'constants/game';

/**
 * Get random word
 *
 * https://rapidapi.com/dpventures/api/wordsapi
 */
export async function getRandomWord() {
  const params = new URLSearchParams({
    // 🏆 The lead character of the show
    random: 'true',
    // By default Words API returns a bunch of results which are not needed
    limit: '1',
    // Words API doesn't count space as a character, so we need to take that
    // into account
    lettersMax: String(MAX_WORD_LENGTH - 1),
  });

  const response = await fetch(wordsApi.url + '/?' + params, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': wordsApi.key,
      'x-rapidapi-host': wordsApi.host,
    },
  });
  const { word } = await response.json();
  if (typeof word === 'string') {
    return word;
  }
  throw new Error(`☠️ There something's wrong with the "word"`);
}
