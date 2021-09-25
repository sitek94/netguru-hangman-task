import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';

describe('Modal component', () => {
  it('renders correctly without a button', () => {
    render(<Modal title="Hangman" description="a simple game" noButton />);

    expect(screen.getByText(/hangman/i)).toBeInTheDocument();
    expect(screen.getByText(/a simple game/i)).toBeInTheDocument();
  });

  it('renders correctly with a button', () => {
    render(
      <Modal
        title="Hangman"
        description="a simple game"
        buttonText="Start game"
        onButtonClick={() => {}}
      />,
    );

    expect(screen.getByText(/hangman/i)).toBeInTheDocument();
    expect(screen.getByText(/a simple game/i)).toBeInTheDocument();
    expect(screen.getByText(/Start game/i)).toBeInTheDocument();
  });

  it('calls onButtonClick handler one time', () => {
    const onButtonClick = jest.fn();
    const buttonText = 'Start game';
    render(
      <Modal
        title="Hangman"
        description="a simple game"
        buttonText={buttonText}
        onButtonClick={onButtonClick}
      />,
    );

    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
