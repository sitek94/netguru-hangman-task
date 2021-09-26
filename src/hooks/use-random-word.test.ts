import { act, renderHook } from '@testing-library/react-hooks';

import { createDevApi, WordsApi } from 'api/words';

import { useRandomWord } from './use-random-word';

jest.mock('');

beforeAll(() => {
  console.error = jest.fn();
});

function renderUseRandomWord(word: string) {
  const api = createDevApi([word]);

  return renderHook(() => useRandomWord(api));
}

describe('useRandomWord hook', () => {
  it('handles state when is fetching a word', async () => {
    const { result } = renderUseRandomWord('sth');

    expect(result.current.status).toBe('pending');

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
  });

  it('handles state when successfully fetched a word and returns a word in uppercase', async () => {
    const expectedWord = 'hangman';
    const { result } = renderUseRandomWord(expectedWord);

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
    expect(result.current.randomWord).toBe(expectedWord.toUpperCase());
  });

  it('handles state when failed to fetch a word', async () => {
    const mockApi: WordsApi = {
      getRandomWord: jest.fn(() => Promise.reject()),
    };
    const { result } = renderHook(() => useRandomWord(mockApi));

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('rejected');
  });
});
