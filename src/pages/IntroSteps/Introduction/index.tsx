import { Button, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';

function Introduction() {
  return (
    <Box elevation={2} padding="2rem">
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="1.5rem">
          CONUN DISTRIBUTED SUPERCOMPUTING PLATFORM
        </Text>
        <Text textAlign="justify">
          CONUN&apos;s Distributed Computing provides a universal computing
          network architecture platform that enables distributed processing of
          personal computers connected to the Internet based on desktop grid
          computing technology. CONUN is operated by an agreement between
          distributed computing resource share participants and users and
          supports an open and horizontal profit ecosystem for all participants.
        </Text>
        <Link to="/terms">
          <Button colorScheme="yellow" width="100%">
            Next
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Introduction;
