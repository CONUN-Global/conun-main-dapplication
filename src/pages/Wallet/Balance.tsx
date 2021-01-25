import React from 'react';
import { useQuery } from 'react-query';
import { Button, Spinner, Stack, Text } from '@chakra-ui/react';

import Box from '../../components/Box';
import Icon from '../../components/Chakra/Icon';

import useGetConBalance from '../../hooks/useGetConBalance';
import useGetEthBalance from '../../hooks/useGetEthBalance';
import useAppCurrentUser from '../../hooks/useAppCurrentUser';

import instance from '../../axios/instance';

import { ReactComponent as Refresh } from '../../../assets/icons/refresh.svg';

function Balance() {
  const { currentUser } = useAppCurrentUser();
  const { balance } = useGetEthBalance();

  const { balance: conBalance } = useGetConBalance();

  const { data, isLoading, refetch, remove } = useQuery('balance', () =>
    instance.get(
      `/con-token/channels/mychannel/chaincodes/coin?wallet_address=${currentUser.wallet_address}&orgName=Org1&fcn=BalanceOf`
    )
  );
  return (
    <Box elevation={2} padding="25px" bgColor="#5a78f0" color="#fff">
      <Stack
        alignItems="flex-start"
        height="100%"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize="22px">
          Balance
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>{data?.data?.result ?? 0}</Text>
          <Text as="span" fontSize="18px">
            COIN
          </Text>
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>{balance ?? 0}</Text>
          <Text as="span" fontSize="18px">
            ETH
          </Text>
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>{conBalance ?? 0}</Text>
          <Text as="span" fontSize="18px">
            CON
          </Text>
        </Text>
        <Button
          bgColor="transparent"
          padding={0}
          alignSelf="flex-end"
          minWidth="auto"
          _active={{ bgColor: 'transparent' }}
          _focus={{ border: 'none' }}
          _hover={{ bgColor: 'transparent' }}
          width="auto"
          onClick={async () => {
            await remove();
            refetch();
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <Icon icon={Refresh} fill="#fff" width="18px" height="18px" />
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default Balance;
