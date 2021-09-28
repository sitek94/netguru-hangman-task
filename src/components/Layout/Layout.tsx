import './Layout.scss';

import * as React from 'react';

import GitHubCorner from 'components/GitHubCorner';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div data-testid="layout" className="layout">
      <GitHubCorner />
      <div className="container">{children}</div>
    </div>
  );
}

export default Layout;
