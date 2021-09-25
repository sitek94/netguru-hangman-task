import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WordsApi } from 'api/words';

import App from './App';
import { flushPromises } from 'test/utils';

// Custom render
const renderApp = (api: WordsApi) => render(<App api={api} />);

// Mocks
const createMockApi = (getRandomWord = jest.fn()) => ({
  getRandomWord,
});

// Helpers
const getButton = (name: string) =>
  screen.getByRole('button', { name: new RegExp(name, 'i') });
const getStartGameButton = () => getButton('start game');
const startGame = () => userEvent.click(getStartGameButton());

describe('<App>', () => {
  describe('when game is run for the first time', () => {
    it('shows "Initial screen"', async () => {
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue('folk');
      renderApp(api);

      await flushPromises();

      expect(getStartGameButton()).toBeInTheDocument();
    });

    it('cleans the screen after clicking "Start game"', async () => {
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue('folk');
      renderApp(api);

      await flushPromises();

      const letters = screen.getByText(/B D E Z P U K L Q W/);
      const startButton = screen.getByText(/Start game/i);
      const title = screen.getByText(/Netguru hangman/i);

      userEvent.click(getStartGameButton());

      expect(letters).not.toBeInTheDocument();
      expect(startButton).not.toBeInTheDocument();
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('when game has started', () => {
    it('fetches a new word when the one fetched is too long', async () => {
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue('definitely-too-long-string');
      renderApp(api);

      // Finish initial loading
      await flushPromises();

      userEvent.click(getStartGameButton());

      expect(api.getRandomWord).toBeCalledTimes(2);
    });

    it('shows the loading screen when fetching a random word', async () => {
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue('test');
      renderApp(api);

      userEvent.click(getStartGameButton());
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      await flushPromises();

      // Should NOT show loading screen anymore
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it('shows the error screen when failed to fetch a random word', async () => {
      console.error = jest.fn();
      const api = createMockApi();
      api.getRandomWord.mockRejectedValue('error');
      renderApp(api);

      await flushPromises();

      userEvent.click(getStartGameButton());

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(console.error).toBeCalledTimes(1);
    });

    it('shows the game-over screen when user pressed incorrect letter 11 times', async () => {
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue('m');
      renderApp(api);

      await flushPromises();

      userEvent.click(getStartGameButton());
      userEvent.type(screen.getByTestId('layout'), 'QWERTYUIOPS');

      expect(screen.getByText(/game over/i)).toBeInTheDocument();
    });

    it('shows the game-won screen when user found all correct letters', async () => {
      const expectedWord = 'hangman';
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue(expectedWord);
      renderApp(api);

      await flushPromises();

      userEvent.click(getStartGameButton());
      userEvent.type(screen.getByTestId('layout'), expectedWord);

      expect(screen.getByText(/you won/i)).toBeInTheDocument();
    });
  });

  describe('when game has finished - player won/lost', () => {
    it('is possible to start a new game by hitting "again"', async () => {
      const expectedWord = 'pizza';
      const api = createMockApi();
      api.getRandomWord.mockResolvedValue(expectedWord);
      renderApp(api);

      const winGame = () =>
        userEvent.type(screen.getByTestId('layout'), expectedWord);
      const hitAgainBtn = () => userEvent.click(getButton('again'));

      // Get first word on initial load
      expect(api.getRandomWord).toHaveBeenCalledTimes(1);

      await flushPromises();

      startGame();
      winGame();

      expect(screen.getByText(/you won/i)).toBeInTheDocument();

      hitAgainBtn();
      // Get second word after clicking "again"
      expect(api.getRandomWord).toHaveBeenCalledTimes(2);

      await flushPromises();

      // Win the game
      winGame();
      hitAgainBtn();

      // Get third word
      expect(api.getRandomWord).toHaveBeenCalledTimes(3);
    });
  });

  describe(`when "initial", "game-won", "game-over", "loading" or "error" screen is shown`, () => {
    it('does nothing on key down event', async () => {
      render(<App api={createMockApi()} />);

      userEvent.type(screen.getByTestId('layout'), 'adsfascxvqewrqefsdafsa123');

      expect(screen.getByText(/Start game/i)).toBeInTheDocument();
    });
  });
});
