import React from 'react';
import { Button, Grid, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { clipboard } from 'electron';

import Box from '../../components/Box';
import Icon from '../../components/Chakra/Icon';

import useAppCurrentUser from '../../hooks/useAppCurrentUser';

import { ReactComponent as Copy } from '../../../assets/icons/copy.svg';
import { ReactComponent as Refresh } from '../../../assets/icons/refresh.svg';

import instance from '../../axios/instance';
import useGetEthBalance from '../../hooks/useGetEthBalance';
import useGetConBalance from '../../hooks/useGetConBalance';

function Wallet() {
  const { currentUser } = useAppCurrentUser();

  const { balance } = useGetEthBalance();

  const { balance: conBalance } = useGetConBalance();

  const { data, isLoading, refetch, remove } = useQuery('balance', () =>
    instance.get(
      `/con-token/channels/mychannel/chaincodes/coin?wallet_address=${currentUser.wallet_address}&orgName=Org1&fcn=BalanceOf`
    )
  );

  const toast = useToast();

  return (
    <Box elevation={2} p="1rem" width="90vw" bgColor="#f2f4fa">
      <Grid templateColumns="repeat(3, 1fr)" gap={4} justifyItems="center">
        <Box
          elevation={2}
          padding="25px"
          bgColor="#7070e3"
          color="#fff"
          width="300px"
        >
          <Stack
            alignItems="flex-start"
            height="100%"
            justifyContent="space-between"
          >
            <Text fontWeight="bold" fontSize="22px">
              Address
            </Text>
            <Text fontSize="14px" wordBreak="break-word">
              {currentUser.wallet_address}
            </Text>

            <Button
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
              _active={{ bgColor: 'transparent' }}
              _focus={{ border: 'none' }}
              width="auto"
              padding={0}
              minWidth="auto"
              onClick={() => {
                clipboard.writeText(currentUser.wallet_address);
                toast({
                  title: 'Wallet address copied',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                  position: 'top',
                });
              }}
            >
              <Icon icon={Copy} fill="#fff" width="18px" height="18px" />
            </Button>
          </Stack>
        </Box>
        <Box
          elevation={2}
          padding="25px"
          bgColor="#5a78f0"
          color="#fff"
          width="300px"
        >
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
        <Box
          elevation={2}
          padding="25px"
          bgColor="#25b0e8"
          color="#fff"
          width="300px"
        >
          <Stack
            alignItems="flex-start"
            height="100%"
            justifyContent="space-between"
          >
            <Text fontWeight="bold" fontSize="22px">
              Coin Details
            </Text>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}

export default Wallet;
