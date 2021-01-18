import * as React from 'react';

function useRandomWord() {
  const [word, setWord] = React.useState('');

  React.useEffect(() => {
    const fetchNewWord = async () => {
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
        fetchNewWord();
      } else {
        setWord(fetchedWord.toUpperCase());
      }
    };

    fetchNewWord();
  }, []);

  return word;
}

export default useRandomWord;
