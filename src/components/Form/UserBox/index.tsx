import React from 'react';
import { Image, Stack, Text } from '@chakra-ui/react';
import useCurrentUser from '../../../hooks/useCurrentUser';

function UserBox() {
  const { currentUser } = useCurrentUser();
  return (
    <Stack position="absolute" top="1%" right="1%" alignItems="center">
      <Image
        src={currentUser?.picture}
        height={50}
        width={50}
        borderRadius="50%"
      />
      <Text fontSize="0.8rem">{currentUser?.name}</Text>
    </Stack>
  );
}

export default UserBox;
