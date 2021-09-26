import * as React from 'react';

import { WordsApi } from 'api/words';
import { MAX_MISSED_LETTERS, MAX_WORD_LENGTH } from 'constants/game';
import { useRandomWord } from 'hooks/use-random-word';
import Folk from 'components/Folk';
import Layout from 'components/Layout';
import LetterTiles from 'components/LetterTiles';
import Modal from 'components/Modal';
import YouMissed from 'components/YouMissed';

interface AppProps {
  api: WordsApi;
}

function App({ api }: AppProps) {
  const [isFirstGame, setIsFirstGame] = React.useState(true);
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
  const { randomWord, status, fetchRandomWord } = useRandomWord(api);

  const missedLetters = usedLetters.filter(l => !randomWord.includes(l));
  const guessedLetters = usedLetters.filter(l => randomWord.includes(l));

  // Game is lost when player user reached steps limit
  const isGameOver = missedLetters.length === MAX_MISSED_LETTERS;

  // Game is won when each letter of the random word can be found
  // among the guessed letters
  const isGameWon = randomWord.split('').every(l => guessedLetters.includes(l));

  // Fetch status
  const isLoading = status === 'pending';
  const isError = status === 'rejected';
  const isSuccess = status === 'resolved';

  // Add/remove key down event listener
  React.useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      // Pressed key is not alphabetical
      if (!/^[a-z]$/i.test(key)) {
        return;
      }

      // Pressed key been used already
      if (usedLetters.includes(key.toUpperCase())) {
        return;
      }

      // One of the screens `initial`, `game-won`, `game-over`, `loading`,
      // `error` is shown
      if (isFirstGame || isGameWon || isGameOver || isLoading || isError) {
        return;
      }

      setUsedLetters(usedLetters.concat(key.toUpperCase()));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters, isFirstGame, isGameWon, isGameOver, isLoading, isError]);

  // When random word is too long fetches new one
  React.useEffect(() => {
    if (randomWord.length > MAX_WORD_LENGTH) {
      fetchRandomWord();
    }
  }, [randomWord, fetchRandomWord]);

  // Fetches new word and resets the used letters
  const startNewGame = () => {
    setUsedLetters([]);
    fetchRandomWord();
  };

  // Starts the first game
  const startFirstGame = () => {
    setIsFirstGame(false);
  };

  // Initial game screen
  if (isFirstGame) {
    return (
      <Layout>
        <Modal
          title="Netguru Hangman"
          description="This is a simple Hangman game, have fun and good luck!"
          buttonText="Start game"
          onButtonClick={startFirstGame}
        />
        <Folk visiblePartsCount={11} />
        <YouMissed
          missedLetters={['B', 'D', 'E', 'Z', 'P', 'U', 'K', 'L', 'Q', 'W']}
        />
        <LetterTiles word="HANGMAN" guessedLetters={['H', 'A']} />
      </Layout>
    );
  }

  // When the word is too long, before new one is fetched use empty string
  // to so that <LetterTile> is semi-transparent
  const word = randomWord.length > MAX_WORD_LENGTH ? '' : randomWord;

  // After the initial game
  return (
    <Layout>
      {/* Loading screen */}
      {isLoading && <Modal title="Loading..." noButton />}

      {/* Error screen */}
      {isError && (
        <Modal
          title="Ooops :("
          description="Something went wrong, try refreshing the page."
          noButton
        />
      )}

      {/* Game over screen */}
      {isGameOver && isSuccess && (
        <Modal
          title="Game over"
          buttonText="New word"
          onButtonClick={startNewGame}
        />
      )}

      {/* Game won screen */}
      {isGameWon && isSuccess && (
        <Modal
          title="You won!"
          buttonText="Again"
          description={`Congratulations, you missed ${missedLetters.length} letters.`}
          onButtonClick={startNewGame}
        />
      )}

      <Folk visiblePartsCount={missedLetters.length} />
      <YouMissed missedLetters={missedLetters} />
      <LetterTiles word={word} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;
