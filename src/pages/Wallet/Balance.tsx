import React from 'react';
import { Button, Spinner, Stack, Text } from '@chakra-ui/react';

import Box from '../../components/Box';
import Icon from '../../components/Chakra/Icon';

import useGetConBalance from '../../hooks/useGetConBalance';
import useGetEthBalance from '../../hooks/useGetEthBalance';
import useGetLocalConBalance from '../../hooks/useLocalConBalance';

import { ReactComponent as Refresh } from '../../../assets/icons/refresh.svg';

function Balance() {
  const { balance, refetch: refetchEth } = useGetEthBalance();
  const { balance: conBalance, refetch: refetchCon } = useGetConBalance();
  const { balance: localBalance, loading, refetch } = useGetLocalConBalance();

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
          <Text>{+Number(localBalance)?.toFixed(6) ?? 0}</Text>
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
          <Text>{+Number(balance)?.toFixed(6) ?? 0}</Text>
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
          <Text>{+Number(conBalance)?.toFixed(6) ?? 0}</Text>
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
            await refetch();
            await refetchEth();
            await refetchCon();
          }}
        >
          {loading ? (
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
