import * as React from 'react';

import { WordsApi } from '../api/words';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export function useRandomWord(api: WordsApi) {
  const [word, setWord] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');

  // Fetches random world from WordsAPI
  const fetchRandomWord = React.useCallback(async () => {
    setStatus('pending');

    try {
      const fetchedWord = await api.getRandomWord();
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
