import * as React from 'react';

import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="container">{children}</div>
    </div>
  );
}

export default Layout;
