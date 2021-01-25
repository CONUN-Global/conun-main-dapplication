import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Box from '../../components/Box';

function Details() {
  return (
    <Box elevation={2} padding="25px" bgColor="#25b0e8" color="#fff">
      <Stack
        alignItems="flex-start"
        height="100%"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize="22px">
          Coin Details
        </Text>
      </Stack>
    </Box>
  );
}

export default Details;
