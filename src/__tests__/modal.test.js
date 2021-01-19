import Modal from 'components/modal';
import { render, screen } from '@testing-library/react';

describe('<Modal>', () => {
  it('renders correctly', () => {
    render(<Modal title="Hangman" description="a simple game" />);

    expect(screen.getByText(/hangman/i)).toBeInTheDocument();
    expect(screen.getByText(/a simple game/i)).toBeInTheDocument();
  });
});
