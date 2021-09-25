import * as React from 'react';
import clsx from 'clsx';

import './LetterTile.scss';

interface LetterProps {
  inactive?: boolean;
  children: React.ReactNode;
}

function LetterTile({ inactive, children }: LetterProps) {
  return (
    <div
      aria-label={inactive ? 'Inactive letter tile' : 'Active letter tile'}
      data-testid="letter-tile"
      className={clsx('letter-tile', inactive && 'inactive')}
    >
      {children}
    </div>
  );
}

export default LetterTile;
