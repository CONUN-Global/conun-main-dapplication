import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';
import Button from '../../../components/Button';
import MotionWrapper from '../../../components/MotionWrapper';

import { useAppContext } from '../../../components/AppContext';

import { introVariants } from '../../../const';

function ImportWallet() {
  const { isAlreadyUser } = useAppContext();

  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: 'spring' }}
    >
      <Box elevation={4} padding="2rem" minWidth="30rem">
        <Stack spacing="2rem">
          <Text textAlign="center" fontSize="2rem">
            {isAlreadyUser ? 'Welcome Back' : 'Choose Access Method'}
          </Text>
          <Text textAlign="center">
            {isAlreadyUser
              ? "Let's restore your previous wallet "
              : 'Access your existing Ethereum-based wallet.'}
            <br />
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
          {!isAlreadyUser && (
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
          )}
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default ImportWallet;
