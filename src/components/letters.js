import PropTypes from 'prop-types';
import clsx from 'clsx';
import './letters.scss';

const MAX_WORD_LENGTH = 11;

function Letters({ word = '', guessedLetters = [] }) {
  const disabledLetters = Array(MAX_WORD_LENGTH - word.length).fill();
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
  word: (props, propName) => {
    if (props[propName].length > MAX_WORD_LENGTH) {
      return new Error('`word` prop provided to `<Letters>` is too long');
    }
  },
};

function Letter({ disabled, children }) {
  return (
    <div className={clsx('letter', disabled && 'disabled')}>{children}</div>
  );
}

Letter.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Letters;
