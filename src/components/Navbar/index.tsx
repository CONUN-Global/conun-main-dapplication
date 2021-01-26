import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

import UserBox from '../UserBox';

function Navbar() {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      position="absolute"
      top="0"
      padding="0.5rem 1rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.15)"
    >
      <Text fontWeight="bold">CONUN</Text>
      <UserBox />
    </HStack>
  );
}

export default Navbar;
