import PropTypes from 'prop-types';
import Letter from 'components/letter';
import './letters.scss';

function Letters({ word, guessedLetters = [], maxWordLength = 11 }) {
  const wordLetters = word
    // Pad the word when its length is less than max length
    .padStart(maxWordLength)
    .split('');

  return (
    <div className="letters">
      {wordLetters.map((letter, i) => (
        <Letter key={i} disabled={letter === ' '}>
          {guessedLetters.includes(letter) || letter === '-' ? letter : null}
        </Letter>
      ))}
    </div>
  );
}

Letters.propTypes = {
  guessedLetters: PropTypes.arrayOf(PropTypes.string),
  word: PropTypes.string,
};

export default Letters;
