import * as React from 'react';

import Folk from 'components/folk';
import YouMissed from 'components/you-missed';
import Letters from 'components/letters';
import Layout from 'components/layout';

const word = 'HANGMAN';

function App() {
  const [usedLetters, setUsedLetters] = React.useState([]);

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

  const missedLetters = usedLetters.filter((l) => !word.includes(l));
  const guessedLetters = usedLetters.filter((l) => word.includes(l));

  return (
    <Layout>
      <Folk />
      <YouMissed missedLetters={missedLetters} />
      <Letters word={word} guessedLetters={guessedLetters} />
    </Layout>
  );
}

export default App;
