import { setupWorker } from 'msw';
import { serverHandlers } from 'mocks/server-handlers';

// SetupWorkerAPI - used when running in DEV env
// Setup requests interception using the given serverHandlers.
export const worker = setupWorker(...serverHandlers);
