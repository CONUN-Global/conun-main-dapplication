import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';

function WalletOptions() {
  return (
    <Box>
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Wallet
        </Text>
        <Text textAlign="justify">
          Create a wallet and become a member of CONUN Distributed
          Supercomputing Platform.
        </Text>
        <Stack>
          <Link to="/create-wallet">
            <Button colorScheme="yellow" width="100%">
              Create Wallet
            </Button>
          </Link>
          <Link to="/import-wallet">
            <Button colorScheme="yellow" width="100%">
              Import Wallet
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default WalletOptions;
