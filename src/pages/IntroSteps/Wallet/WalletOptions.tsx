import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';
import MotionWrapper from '../../../components/MotionWrapper';
import Button from '../../../components/Button';

import { introVariants } from '../../../const';

function WalletOptions() {
  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: 'spring' }}
    >
      <Box elevation={2} padding="2rem">
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
    </MotionWrapper>
  );
}

export default WalletOptions;
