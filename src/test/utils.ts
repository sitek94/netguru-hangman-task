import { act } from '@testing-library/react';
import _flushPromises from 'flush-promises';

/**
 * Flush all pending resolved promise handlers.
 */
async function flushPromises() {
  await act(async () => {
    await _flushPromises();
  });
}

export { flushPromises };
