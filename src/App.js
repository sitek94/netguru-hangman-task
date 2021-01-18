import * as React from 'react';

import Folk from 'components/folk';
import YouMissed from 'components/you-missed';
import Letters from 'components/letters';
import Layout from 'components/layout';
import useRandomWord from 'hooks/use-random-word';
import Modal from 'components/modal';

function App() {
  const [isFirstGame, setIsFirstGame] = React.useState(true);
  const [usedLetters, setUsedLetters] = React.useState([]);
  const [{ randomWord, status }, fetchRandomWord] = useRandomWord();

  // Add/remove key down event listener
  React.useEffect(() => {
    const handleKeyDown = ({ key }) => {
      // Pressed key is not alphabetical or has been used already
      if (!/^[a-z]$/i.test(key) || usedLetters.includes(key.toUpperCase())) {
        return;
      }

      setUsedLetters(usedLetters.concat(key.toUpperCase()));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters]);

  // Fetches new word and resets the used letters
  const startNewGame = () => {
    setUsedLetters([]);
    fetchRandomWord();
  };

  // Starts the first game
  const startFirstGame = () => {
    setIsFirstGame(false);
  };

  const missedLetters = usedLetters.filter((l) => !randomWord.includes(l));
  const guessedLetters = usedLetters.filter((l) => randomWord.includes(l));

  // Game ends once folk earns left foot, this happens on 11th step.
  const isGameOver = missedLetters.length === 11;

  // Game is won when each letter of the random word can be found
  // among the guessed letters
  const isGameWon = randomWord
    .split('')
    .every((l) => guessedLetters.includes(l));

  // Fetch status
  const isLoading = status === 'pending';
  const isError = status === 'rejected';
  const isSuccess = status === 'resolved';

  // Initial game
  if (isFirstGame) {
    return (
      <Layout>
        <Modal
          title="Netguru Hangman"
          description={`This is a simple Hangman game, have fun and good luck!`}
          buttonText="Start game"
          onButtonClick={startFirstGame}
        />
        <Folk visiblePartsCount={11} />
        <YouMissed
          missedLetters={['B', 'D', 'E', 'Z', 'P', 'U', 'K', 'L', 'Q', 'W']}
        />
        <Letters word="HANGMAN" guessedLetters={['H', 'A']} />
      </Layout>
    );
  }

  // After the initial game
  return (
    <Layout>
      {isLoading && <Modal title="Loading..." noButton />}
      {isError && (
        <Modal
          title="Ooops :("
          description="Something went wrong, try refreshing the page."
          noButton
        />
      )}
      {isGameOver && isSuccess && (
        <Modal
          title="Game over"
          buttonText="New word"
          onButtonClick={startNewGame}
        />
      )}
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
      <Letters word={randomWord} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;
