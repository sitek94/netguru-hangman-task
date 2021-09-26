import { render, screen } from '@testing-library/react';

import Folk from 'components/Folk/Folk';

describe('<Folk>', () => {
  it('renders correctly', () => {
    render(<Folk visiblePartsCount={5} />);

    expect(screen.getByTestId('folk').childNodes).toHaveLength(5);
  });
});
