import { render, screen } from '@testing-library/react';

import YouMissed from './YouMissed';

describe('<YouMissed>', () => {
  it('renders correctly', () => {
    render(<YouMissed missedLetters={['X', 'Y', 'Z']} />);

    expect(screen.getByText(/You missed/i)).toBeInTheDocument();
    expect(screen.getByText(/x y z/i)).toBeInTheDocument();
  });
});
