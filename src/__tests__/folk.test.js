import Folk from 'components/folk';
import { render, screen } from '@testing-library/react';

describe('<Folk>', () => {
  it('renders correctly', () => {
    render(<Folk visiblePartsCount={5} />);

    expect(screen.getByTestId('folk').childNodes).toHaveLength(5);
  });
});
