import { render, screen } from '@testing-library/react';

import LetterTile from './LetterTile';

describe('LetterTile component', () => {
  it('renders correctly', () => {
    render(<LetterTile>a</LetterTile>);

    const labelTile = screen.getByTestId('letter-tile');
    expect(labelTile).toHaveTextContent('a');
    expect(labelTile).not.toHaveClass('inactive');
  });

  it('applies correctly `disabled` class', () => {
    render(<LetterTile inactive>a</LetterTile>);

    const labelTile = screen.getByTestId('letter-tile');
    expect(labelTile).toHaveTextContent('a');
    expect(labelTile).toHaveClass('inactive');
  });
});
