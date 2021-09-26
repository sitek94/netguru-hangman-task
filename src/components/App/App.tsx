import * as React from 'react';

import { MAX_MISSED_LETTERS } from 'constants/game';
import { screens } from 'constants/content';

import Folk from 'components/Folk';
import YouMissed from 'components/YouMissed';
import LetterTiles from 'components/LetterTiles';
import Layout from 'components/Layout';
import Modal from 'components/Modal';

import { useRandomWord } from 'hooks/use-random-word';

function App() {
  const [isFirstGame, setIsFirstGame] = React.useState(true);
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
  const { randomWord, status, fetchRandomWord } = useRandomWord();

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
          title={screens.start.title}
          description={screens.start.description}
          buttonText={screens.start.button}
          onButtonClick={startFirstGame}
        />
        <Folk visiblePartsCount={11} />
        <YouMissed missedLetters={screens.start.missedLetters} />
        <LetterTiles
          word={screens.start.word}
          guessedLetters={screens.start.guessedLetters}
        />
      </Layout>
    );
  }

  // When the word is too long, before new one is fetched use empty string
  // to so that <LetterTile> is semi-transparent
  // const word = randomWord.length > MAX_WORD_LENGTH ? '' : randomWord;

  // After the initial game
  return (
    <Layout>
      {/* Loading screen */}
      {isLoading && <Modal title={screens.loading.title} noButton />}

      {/* Error screen */}
      {isError && (
        <Modal
          title={screens.error.title}
          description={screens.error.description}
          noButton
        />
      )}

      {/* Game over screen */}
      {isGameOver && isSuccess && (
        <Modal
          title={screens.gameLost.title}
          buttonText={screens.gameLost.button}
          onButtonClick={startNewGame}
        />
      )}

      {/* Game won screen */}
      {isGameWon && isSuccess && (
        <Modal
          title={screens.gameWon.title}
          buttonText={screens.gameWon.button}
          description={screens.gameWon.description(missedLetters.length)}
          onButtonClick={startNewGame}
        />
      )}

      <Folk visiblePartsCount={missedLetters.length} />
      <YouMissed missedLetters={missedLetters} />
      <LetterTiles word={randomWord} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;
