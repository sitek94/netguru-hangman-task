import {
  getButton,
  getByText,
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
} from 'test/utils';

import { getRandomWordMock, server } from 'mocks/test-server';
import { screens } from 'constants/content';

import App from './App';

// Custom render
const renderApp = () => render(<App />);

// Helpers
const getStartGameButton = () => getButton(screens.start.button);
const clickStartGame = () => userEvent.click(getStartGameButton());
const getWinScreen = () => getByText(screens.gameWon.title);
const getLostScreen = () => getByText(screens.gameLost.title);
const type = (text: string) =>
  userEvent.type(screen.getByTestId('layout'), text);

const isGameCleared = () => {
  const folk = screen.getByTestId('folk');
  const missedLetters = screen.getByTestId('missed-letters');
  const letterTiles = screen.getAllByTestId('letter-tile');

  const missedLettersAreEmpty = !missedLetters.hasChildNodes();
  const folkIsEmpty = !folk.hasChildNodes();
  const letterTilesAreEmpty = letterTiles.every(
    letterTile => !letterTile.textContent,
  );
  return missedLettersAreEmpty && letterTilesAreEmpty && folkIsEmpty;
};

describe('App component', () => {
  describe('when game is run for the first time', () => {
    it('shows "Initial screen"', async () => {
      renderApp();

      expect(getStartGameButton()).toBeInTheDocument();
    });

    it('cleans the screen after clicking "Start game"', async () => {
      renderApp();

      const letters = screen.getByText(/B D E Z P U K L Q W/);
      const startButton = screen.getByText(/Start game/i);
      const title = screen.getByText(/Netguru hangman/i);

      clickStartGame();

      await waitForLoadingToFinish();

      expect(letters).not.toBeInTheDocument();
      expect(startButton).not.toBeInTheDocument();
      expect(title).not.toBeInTheDocument();
      expect(isGameCleared()).toBe(true);
    });
  });

  describe('when game has started', () => {
    it('shows the loading screen when fetching a random word', async () => {
      renderApp();

      clickStartGame();

      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      await waitForLoadingToFinish();

      // Should NOT show loading screen anymore
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it('shows the error screen when failed to fetch a random word', async () => {
      server.use(getRandomWordMock.mockError());
      jest.spyOn(console, 'error').mockImplementation(() => {});

      renderApp();

      clickStartGame();
      await waitForLoadingToFinish();

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(console.error).toBeCalledTimes(1);
    });

    it('shows the game-over screen when user pressed incorrect letter 11 times', async () => {
      server.use(getRandomWordMock.mockSuccess('z'));
      renderApp();

      clickStartGame();
      await waitForLoadingToFinish();

      type('Aa{shift}abcdefghijk');

      expect(getLostScreen()).toBeInTheDocument();
    });

    it('shows the game-won screen when user found all correct letters', async () => {
      const expectedWord = 'tolkien';
      server.use(getRandomWordMock.mockSuccess(expectedWord));

      renderApp();

      clickStartGame();
      await waitForLoadingToFinish();

      type(expectedWord);

      expect(screen.getByText(/you won/i)).toBeInTheDocument();
    });
  });

  describe('when game has finished - player won/lost', () => {
    it('is possible to start a new game by hitting "again"', async () => {
      const mockedWords = ['john', 'ronald', 'z'];
      const [firstWord, secondWord] = mockedWords;
      server.use(getRandomWordMock.mockSuccesses(mockedWords));

      renderApp();

      clickStartGame();
      await waitForLoadingToFinish();

      // Win game
      type(firstWord);
      expect(getWinScreen()).toBeInTheDocument();

      userEvent.click(getButton(screens.gameWon.button));
      expect(isGameCleared()).toBe(true);

      await waitForLoadingToFinish();

      // Win game
      type(secondWord);
      expect(getWinScreen()).toBeInTheDocument();

      userEvent.click(getButton(screens.gameWon.button));
      expect(isGameCleared()).toBe(true);

      await waitForLoadingToFinish();

      // Lose game
      type('abcdefghijkl');
      expect(getLostScreen()).toBeInTheDocument();

      userEvent.click(getButton(screens.gameLost.button));
      expect(isGameCleared()).toBe(true);
    });
  });

  describe(`when "initial", "game-won", "game-over", "loading" or "error" screen is shown`, () => {
    it('does nothing on key down event', async () => {
      renderApp();

      userEvent.type(
        screen.getByTestId('layout'),
        'aaAAddsfascxvqewrqefsdafsa123',
      );

      expect(screen.getByText(/Start game/i)).toBeInTheDocument();
    });
  });
});
