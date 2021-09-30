import { handlers } from 'mocks/handlers';
import { setupServer } from 'msw/node';

// SetupServerAPI - used when running in TEST env
// Setup requests interception using the given handlers.
export const server = setupServer(...handlers);
export { getRandomWordMock } from 'mocks/handlers';
export * from 'msw';
