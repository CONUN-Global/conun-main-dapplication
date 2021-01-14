import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

function Signup() {
  const login = () => {};
  return (
    <Flex>
      <Button onClick={login}>Google Login</Button>
    </Flex>
  );
}

export default Signup;
