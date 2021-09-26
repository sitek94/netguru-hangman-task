import './LetterTiles.scss';

import { MAX_WORD_LENGTH } from 'constants/game';

import LetterTile from './LetterTile';

interface LettersProps {
  word: string;
  guessedLetters: string[];
}

function LetterTiles({ word, guessedLetters }: LettersProps) {
  const wordLetters = word
    // Pad the word when its length is less than max length
    .padStart(MAX_WORD_LENGTH)
    .split('');

  return (
    <div className="letter-tiles">
      {wordLetters.map((letter, i) => (
        <LetterTile key={i} inactive={letter === ' '}>
          {guessedLetters.includes(letter) || letter === '-' ? letter : null}
        </LetterTile>
      ))}
    </div>
  );
}

export default LetterTiles;
