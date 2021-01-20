import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppContext } from '../AppContext';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children, ...props }: PrivateRouteProps) {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <Route {...props}>{children}</Route>;
}

export default PrivateRoute;
