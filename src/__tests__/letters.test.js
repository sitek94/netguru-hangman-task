import Letters from 'components/letters';
import { render } from '@testing-library/react';

describe('<Letters>', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Letters word="HANGMAN" guessedLetters={['H', 'A']} />,
    );

    expect(container.firstChild).toBeTruthy();
  });
});
