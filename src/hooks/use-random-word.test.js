import { useRandomWord } from './use-random-word';
import { act, renderHook } from '@testing-library/react-hooks';

describe('useRandomWord hook', () => {
  it('handles state when is fetching a word', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(
      new Promise((resolve) => {
        resolve({
          json: () => Promise.resolve({ word: 'sth' }),
        });
      })
    );

    const { result } = renderHook(useRandomWord);

    expect(result.current.status).toBe('pending');

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
  });

  it('handles state when successfully fetched a word', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve({ word: 'hangman' }),
      })
    );

    const { result } = renderHook(useRandomWord);

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
    expect(result.current.randomWord).toBe('HANGMAN');
  });

  it('handles state when failed to fetch a word', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockReturnValue(
        Promise.reject({ message: 'Failed to fetch a random word' })
      );

    const { result } = renderHook(useRandomWord);

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('rejected');
  });
});
