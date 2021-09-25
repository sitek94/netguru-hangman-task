import { render, screen } from '@testing-library/react';

import LetterTiles from './LetterTiles';

describe('LetterTiles component', () => {
  it('renders correctly', () => {
    render(<LetterTiles word="lotr" guessedLetters={['l', 'o']} />);

    expect(screen.getByText('l')).toBeInTheDocument();
    expect(screen.getByText('o')).toBeInTheDocument();
  });
});
