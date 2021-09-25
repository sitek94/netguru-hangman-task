import _flushPromises from 'flush-promises';
import { act } from '@testing-library/react';

/**
 * Flush all pending resolved promise handlers.
 */
async function flushPromises() {
  await act(async () => {
    await _flushPromises();
  });
}

export { flushPromises };
