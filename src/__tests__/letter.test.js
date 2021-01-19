import Letter from 'components/letter';
import { render, screen } from '@testing-library/react';

describe('<Letter>', () => {
  it('renders correctly', () => {
    render(<Letter>a</Letter>);

    expect(screen.getByText(/a/i)).toBeInTheDocument();
  });

  it('applies correctly `disabled` class', () => {
    render(<Letter disabled>a</Letter>);

    expect(screen.getByText(/a/i)).toHaveClass('disabled');
  });
});
