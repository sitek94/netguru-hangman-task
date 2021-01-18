import PropTypes from 'prop-types';
import Letter from 'components/letter';
import './letters.scss';

function Letters({ word = '', guessedLetters = [], maxWordLength = 11 }) {
  const disabledLetters = Array(maxWordLength - word.length).fill();
  const activeLetters = word.split('');

  return (
    <div className="letters">
      {disabledLetters.map((_, i) => (
        <Letter key={`disabled-${i}`} disabled />
      ))}

      {activeLetters.map((letter, i) => (
        <Letter key={`letter-${i}`}>
          {guessedLetters.includes(letter) ? letter : null}
        </Letter>
      ))}
    </div>
  );
}

Letters.propTypes = {
  guessedLetters: PropTypes.arrayOf(PropTypes.string),

  // Custom validator checks if the word's length doesn't exceed max length
  word: ({ word, maxWordLength }) => {
    if (word.length > maxWordLength) {
      return new Error('`word` prop provided to `<Letters>` is too long');
    }
  },
};

export default Letters;
