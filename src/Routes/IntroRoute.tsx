import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAppContext } from "../components/AppContext";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

function IntroRoute({ children, ...props }: PrivateRouteProps) {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return <Route {...props}>{children}</Route>;
}

export default IntroRoute;
