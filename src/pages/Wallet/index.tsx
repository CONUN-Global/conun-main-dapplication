import React from 'react';
import { Grid } from '@chakra-ui/react';

import Box from '../../components/Box';

import Address from './Address';
import Balance from './Balance';
import Details from './Details';
import Transfer from './Transfer';
import MotionWrapper from '../../components/MotionWrapper';

function Wallet() {
  return (
    <MotionWrapper
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -400, opacity: 0 }}
      transition={{
        duration: 0.5,
        damping: 12,
        stiffness: 100,
      }}
    >
      <Box
        elevation={2}
        p="1rem"
        width={['98vw', '95vw', '90vw']}
        height="100%"
      >
        <Grid
          templateColumns={['1fr', '1fr 1fr', 'repeat(3, 1fr)']}
          gap={4}
          justifyItems="stretch"
        >
          <Address />
          <Balance />
          <Details />
          <Transfer />
        </Grid>
      </Box>
    </MotionWrapper>
  );
}

export default Wallet;
