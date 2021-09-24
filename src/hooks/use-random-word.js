import * as React from 'react';

export function useRandomWord(api) {
  const [word, setWord] = React.useState('');
  const [status, setStatus] = React.useState('idle');

  // Fetches random world from WordsAPI
  const fetchRandomWord = React.useCallback(async () => {
    setStatus('pending');

    try {
      const fetchedWord = await api.getRandomWord();
      console.log(fetchedWord);
      setStatus('resolved');
      setWord(fetchedWord.toUpperCase());
    } catch (e) {
      setStatus('rejected');

      console.error(e);
    }
  }, [api]);

  // Initial fetch
  React.useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  return { status, randomWord: word, fetchRandomWord };
}
