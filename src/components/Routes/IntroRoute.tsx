import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { useAppContext } from '../AppContext';

const newUserPaths = ['/', '/terms', 'wallet-options', 'create-wallet'];

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

function IntroRoute({ children, ...props }: PrivateRouteProps) {
  const { isAuthenticated, isAlreadyUser } = useAppContext();

  const { pathname } = useLocation();

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  if (isAlreadyUser && newUserPaths.includes(pathname)) {
    return <Redirect to="/import-wallet" />;
  }

  return (
    <Route {...props}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={['1rem', '3rem', '5rem']}
      >
        {children}
      </Flex>
    </Route>
  );
}

export default IntroRoute;
