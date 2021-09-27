import { serverHandlers } from 'mocks/server-handlers';
import { setupWorker } from 'msw';

// SetupWorkerAPI - used when running in DEV env
// Setup requests interception using the given serverHandlers.
export const worker = setupWorker(...serverHandlers);
