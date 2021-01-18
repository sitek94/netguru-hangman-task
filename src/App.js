import * as React from 'react';

import Folk from 'components/folk';
import YouMissed from 'components/you-missed';
import Letters from 'components/letters';
import Layout from 'components/layout';
import useRandomWord from 'hooks/use-random-word';
import Modal from 'components/modal';

function App() {
  const [usedLetters, setUsedLetters] = React.useState([]);
  const [randomWord, fetchRandomWord] = useRandomWord();

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

  const handleNewWordClick = () => {
    setUsedLetters([]);
    fetchRandomWord();
  };

  const missedLetters = usedLetters.filter((l) => !randomWord.includes(l));
  const guessedLetters = usedLetters.filter((l) => randomWord.includes(l));

  // Filter out spaces and dashes
  const randomWordLetters = randomWord.split('').filter(l => l !== ' ' && l !== '-');

  const isGameOver = missedLetters.length === 11;
  const isGameWon = guessedLetters.length === randomWordLetters.length;

  return (
    <Layout>
      {isGameOver && (
        <Modal
          title="Game over"
          buttonText="New word"
          onButtonClick={handleNewWordClick}
        />
      )}
      {isGameWon && (
        <Modal
          title="You won!"
          buttonText="Again"
          description={`Congratulations, you missed ${missedLetters.length} letters.`}
          onButtonClick={handleNewWordClick}
        />
      )}
      <Folk visiblePartsCount={missedLetters.length} />
      <YouMissed missedLetters={missedLetters} />
      <Letters word={randomWord} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;
