import 'assets/fonts/fonts.scss';
import 'assets/sass/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App/App';
import { isDevelopment, isMSWEnabled, project } from 'config';

async function main() {
  // Conditionally enable Mock Service Worker
  if (isDevelopment && isMSWEnabled) {
    // Make sure that your url is rewriten to use / at the end of the pathname.
    // https://mswjs.io/docs/getting-started/integrate/browser#using-homepage-property-in-packagejson
    if (window.location.pathname === project.pathname) {
      window.location.pathname = project.pathname + '/';
      return;
    }
    const { worker } = require('./mocks/dev-worker');

    await worker.start({
      quiet: true,
      serviceWorker: {
        url: project.pathname + '/mockServiceWorker.js',
      },
    });
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

main();
