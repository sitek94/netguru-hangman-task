import { setupWorker } from 'msw';
import { serverHandlers } from 'mocks/server-handlers';

// import {homepage} from '../../../package.json'

// const fullUrl = new URL(homepage)

// SetupServerAPI - used when running in DEV env
// Setup requests interception using the given serverHandlers.
export const worker = setupWorker(...serverHandlers);
//
// server.start({
//   quiet: true,
//   serviceWorker: {
//     url: fullUrl.pathname + 'mockServiceWorker.js',
//   },
// })
