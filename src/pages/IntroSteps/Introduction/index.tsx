import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';
import MotionWrapper from '../../../components/MotionWrapper';
import Button from '../../../components/Button';

import { introVariants } from '../../../const';

function Introduction() {
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
          <Text textAlign="center" fontSize="1.5rem">
            CONUN DISTRIBUTED SUPERCOMPUTING PLATFORM
          </Text>
          <Text textAlign="justify">
            CONUN&apos;s Distributed Computing provides a universal computing
            network architecture platform that enables distributed processing of
            personal computers connected to the Internet based on desktop grid
            computing technology. CONUN is operated by an agreement between
            distributed computing resource share participants and users and
            supports an open and horizontal profit ecosystem for all
            participants.
          </Text>
          <Link to="/terms">
            <Button colorScheme="yellow" width="100%">
              Next
            </Button>
          </Link>
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default Introduction;
