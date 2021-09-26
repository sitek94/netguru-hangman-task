import * as React from 'react';

import { getRandomWord } from 'api/words';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export function useRandomWord() {
  const [word, setWord] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');

  // Fetches random world from WordsAPI
  const fetchRandomWord = React.useCallback(async () => {
    setStatus('pending');

    try {
      const fetchedWord = await getRandomWord();

      // If the word exceeds "maxLength", recursively call fetchRandomWord again
      // until there will be word with correct length.
      setStatus('resolved');
      setWord(fetchedWord.toUpperCase());
    } catch (e) {
      setStatus('rejected');

      console.error(e);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  return {
    status,
    fetchRandomWord,
    randomWord: word,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isResolved: status === 'resolved',
    isRejected: status === 'rejected',
  };
}
