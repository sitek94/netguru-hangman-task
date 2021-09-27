import { serverHandlers } from 'mocks/server-handlers';
import { setupServer } from 'msw/node';

// SetupServerAPI - used when running in TEST env
// Setup requests interception using the given serverHandlers.
export const server = setupServer(...serverHandlers);
export { getRandomWordMock } from 'mocks/server-handlers';
export * from 'msw';
