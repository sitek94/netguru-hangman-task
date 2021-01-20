import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'app';
import * as hooks from 'hooks/use-random-word';

describe('<App>', () => {
  describe('when game is run for the first time', () => {
    it('shows "Initial screen"', () => {
      render(<App />);

      expect(
        screen.getByRole('button', { name: /start game/i })
      ).toBeInTheDocument();
    });

    it('cleans the screen after clicking "Start game"', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'hangman',
        status: 'resolved',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      const letters = screen.getByText(/B D E Z P U K L Q W/);
      const startButton = screen.getByText(/Start game/i);
      const title = screen.getByText(/Netguru hangman/i);

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      expect(letters).not.toBeInTheDocument();
      expect(startButton).not.toBeInTheDocument();
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('when game has started', () => {
    it('fetches a new word when the one fetched is too long', async () => {
      const fetchFn = jest.fn();
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'THIS-IS-DEFINITELY-TOO-LONG',
        status: 'resolved',
        fetchRandomWord: fetchFn,
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      expect(fetchFn).toBeCalledTimes(1);
    });

    it('shows the loading screen when fetching a random word', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: '',
        status: 'pending',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('shows the error screen when failed to fetch a random word', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: '',
        status: 'rejected',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('shows the game-over screen when user pressed incorrect letter 11 times', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'HANGMAN',
        status: 'resolved',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      userEvent.type(document.activeElement, 'QWERTYUIOPS');

      expect(screen.getByText(/game over/i)).toBeInTheDocument();
    });

    it('shows the game-won screen when user found all correct letters', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'HANGMAN',
        status: 'resolved',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      userEvent.type(document.activeElement, 'HANGMAN');

      expect(screen.getByText(/you won/i)).toBeInTheDocument();
    });
  });

  describe('when game has finished - player won/lost', () => {
    it('fetches a new word after clicking the button', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'HANGMAN',
        status: 'resolved',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.click(screen.getByRole('button', { name: /start game/i }));

      userEvent.type(document.activeElement, 'HANGMAN');

      expect(screen.getByText(/you won/i)).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /again/i }));
    });
  });

  describe(`when "initial", "game-won", "game-over", "loading" or "error" screen is shown`, () => {
    it('does nothing on key down event', async () => {
      jest.spyOn(hooks, 'useRandomWord').mockReturnValue({
        randomWord: 'HANGMAN',
        status: 'resolved',
        fetchRandomWord: jest.fn(),
      });

      await act(async () => render(<App />));

      userEvent.type(document.activeElement, 'HANGMAN');

      expect(screen.getByText(/Start game/i)).toBeInTheDocument();
    });
  });
});
