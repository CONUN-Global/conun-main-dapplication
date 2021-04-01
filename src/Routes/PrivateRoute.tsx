import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

import { useAppContext } from "../components/AppContext";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children, ...props }: PrivateRouteProps) {
  const { isAuthenticated } = useAppContext();
  const { pathname } = useLocation();

  if (!isAuthenticated && pathname !== "/transfer") {
    return <Redirect to="/" />;
  }

  return <Route {...props}>{children}</Route>;
}

export default PrivateRoute;
