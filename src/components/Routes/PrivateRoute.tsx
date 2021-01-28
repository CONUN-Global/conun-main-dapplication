import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Navbar from '../Navbar';

import { useAppContext } from '../AppContext';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children, ...props }: PrivateRouteProps) {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Route {...props}>
      <Navbar />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxHeight="calc(100vh - 51px)"
        marginTop="51px"
        padding="1rem 0"
      >
        {children}
      </Flex>
    </Route>
  );
}

export default PrivateRoute;
