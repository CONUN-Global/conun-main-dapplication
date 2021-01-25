import React from 'react';
import { Grid } from '@chakra-ui/react';

import Box from '../../components/Box';

import Address from './Address';
import Balance from './Balance';
import Details from './Details';
import Transfer from './Transfer';

function Wallet() {
  return (
    <Box
      elevation={2}
      p="1rem"
      width={['98vw', '95vw', '90vw']}
      bgColor="#f2f4fa"
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
  );
}

export default Wallet;
