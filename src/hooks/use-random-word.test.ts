import { act, renderHook } from '@testing-library/react-hooks';
import { getRandomWordMock, server } from 'mocks/server';

import { useRandomWord } from './use-random-word';

beforeAll(() => {
  console.error = jest.fn();
});

describe('useRandomWord hook', () => {
  it('handles state when is fetching a word', async () => {
    const { result } = renderHook(useRandomWord);

    expect(result.current.status).toBe('pending');

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
  });

  it('handles state when successfully fetched a word and returns a word in uppercase', async () => {
    server.use(getRandomWordMock.mockSuccess('lowercase'));

    const { result } = renderHook(useRandomWord);

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('resolved');
    expect(result.current.randomWord).toBe('lowercase'.toUpperCase());
  });

  it('handles state when failed to fetch a word', async () => {
    server.use(getRandomWordMock.mockError());
    const { result } = renderHook(useRandomWord);

    await act(async () => result.current.fetchRandomWord());

    expect(result.current.status).toBe('rejected');
  });
});
