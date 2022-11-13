import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRouter = memo(function PrivateRouter(props: { isAuthenticated: boolean; children: ReactNode }) {
  const { isAuthenticated, children } = props;
  console.log(`PrivateRouter: ${isAuthenticated}`);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
});
