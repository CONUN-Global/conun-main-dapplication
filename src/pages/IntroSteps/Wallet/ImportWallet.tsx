import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';

function ImportWallet() {
  return (
    <Box elevation={4} padding="2rem" minWidth="30rem">
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Choose Access Method
        </Text>
        <Text textAlign="center">
          Access your existing Ethereum-based wallet.
          <br />
          Choose from method options below.
        </Text>
        <Stack spacing="1rem" mb="1rem">
          <Link to="/import-keystore" width="100%">
            <Button colorScheme="yellow" width="inherit">
              KeyStoreFile.json
            </Button>
          </Link>
          <Link to="/import-qr-code" width="100%">
            <Button colorScheme="yellow" width="inherit">
              QR Code
            </Button>
          </Link>
          <Link to="/import-private-key" width="100%">
            <Button colorScheme="yellow" width="inherit">
              Private Key
            </Button>
          </Link>
        </Stack>
        <Link to="/wallet-options">
          <Button
            width="100%"
            type="button"
            variant="outline"
            colorScheme="yellow"
          >
            Back
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default ImportWallet;
