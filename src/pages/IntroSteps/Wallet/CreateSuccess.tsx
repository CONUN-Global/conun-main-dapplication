import React from 'react';
import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react';

import { ReactComponent as Download } from '../../../../assets/icons/download.svg';
import { ReactComponent as Export } from '../../../../assets/icons/foreign.svg';
import { ReactComponent as Copy } from '../../../../assets/icons/copy.svg';

import Box from '../../../components/Box';
import Icon from '../../../components/Chakra/Icon';
import Link from '../../../components/Chakra/Link';

function CreateSuccess() {
  return (
    <Box>
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Account Created Successfully
        </Text>
        <Text textAlign="justify">
          Welcome to CONUN Distributed Supercomputing Platform. Please backup
          your account information and Download QR Code.
        </Text>
        <Stack bgColor="grey" p="1rem" borderRadius="5px">
          <HStack justifyContent="space-between">
            <Text>WALLET ADDRESS</Text>{' '}
            <Text>0x23432ed32d23nkl3hvsd2h2l3h2j2ccc4dfd343sd</Text>
            <Icon icon={Copy} width={18} height={18} />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>PRIVATE KEY</Text>
            <Text>0x23432ed32d23nkl3hvsd2h2l3h2j2ccc4dfd343sd</Text>
            <Icon icon={Copy} width={18} height={18} />
          </HStack>
        </Stack>
        <Flex>
          <Box bgColor="grey" p="1rem" width="49%" mr="2%" noStyle>
            <Text>
              Backup Wallet <br /> KeyStoreFile.json
            </Text>
            <Icon ml="auto" icon={Download} width={30} height={30} />
          </Box>
          <Box bgColor="grey" p="1rem" width="49%" noStyle>
            <Text>
              Export Account <br /> QR Code
            </Text>
            <Icon ml="auto" icon={Export} width={30} height={30} />
          </Box>
        </Flex>
        <Link to="/wallet-confirm-backup">
          <Button type="button" width="100%" colorScheme="yellow">
            Next
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default CreateSuccess;
