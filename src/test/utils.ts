import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );
}

// Commonly used functions extended to be case insensitive by default
function getButton(name: string) {
  return screen.getByRole('button', { name: new RegExp(name, 'i') });
}
function getByText(text: string) {
  return screen.getByText(new RegExp(text, 'i'));
}

// Re-export everything from rtl so it's user to import in test files
export * from '@testing-library/react';
export { getButton, getByText, userEvent, waitForLoadingToFinish };
