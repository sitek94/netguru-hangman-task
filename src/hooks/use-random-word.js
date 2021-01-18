import * as React from 'react';

function useRandomWord() {
  const [word, setWord] = React.useState('');
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState(null);

  // Fetches random world from WordsAPI
  const fetchRandomWord = React.useCallback(async () => {
    setStatus('pending');

    try {
      const response = await fetch(
        `https://wordsapiv1.p.rapidapi.com/words/?random=true`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          },
        }
      );

      const { word: fetchedWord } = await response.json();

      // If the word is too long fetch new one
      if (fetchedWord.length > 11) {
        fetchRandomWord();
      } else {
        setWord(fetchedWord.toUpperCase());
        setStatus('resolved');
      }
    } catch (e) {
      setStatus('rejected');
      setError(e);

      console.log(e);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  return [{ status, randomWord: word, error }, fetchRandomWord];
}

export default useRandomWord;
