import React from 'react';
import { Flex } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Flex
      minWidth="100vw"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {children}
    </Flex>
  );
}

export default Layout;
