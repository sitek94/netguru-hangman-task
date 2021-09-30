import * as React from 'react';

import { screens } from 'constants/content';
import { MAX_MISSED_LETTERS } from 'constants/game';
import { useRandomWord } from 'hooks/use-random-word';
import Folk from 'components/Folk';
import Layout from 'components/Layout';
import LetterTiles from 'components/LetterTiles';
import Modal from 'components/Modal';
import YouMissed from 'components/YouMissed';

function App() {
  const [isFirstGame, setIsFirstGame] = React.useState(true);
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
  const { randomWord, fetchRandomWord, isPending, isResolved, isRejected } =
    useRandomWord();

  const missedLetters = usedLetters.filter(l => !randomWord.includes(l));
  const guessedLetters = usedLetters.filter(l => randomWord.includes(l));

  // Game is lost when player user reached steps limit
  const isGameOver = missedLetters.length === MAX_MISSED_LETTERS;

  // Game is won when each letter of the random word can be found
  // among the guessed letters
  const isGameWon = randomWord.split('').every(l => guessedLetters.includes(l));

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
      if (isFirstGame || isGameWon || isGameOver || isPending || isRejected) {
        return;
      }

      setUsedLetters(usedLetters.concat(key.toUpperCase()));
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters, isFirstGame, isGameWon, isGameOver, isPending, isRejected]);

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
      {isPending && <Modal title={screens.loading.title} noButton />}

      {/* Error screen */}
      {isRejected && (
        <Modal
          title={screens.error.title}
          description={screens.error.description}
          noButton
        />
      )}

      {/* Game over screen */}
      {isResolved && isGameOver && (
        <Modal
          title={screens.gameLost.title}
          buttonText={screens.gameLost.button}
          onButtonClick={startNewGame}
        />
      )}

      {/* Game won screen */}
      {isResolved && isGameWon && (
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
