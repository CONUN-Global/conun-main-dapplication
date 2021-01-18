import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { Button, Flex, HStack, Stack, Text, useToast } from '@chakra-ui/react';

import { ReactComponent as Download } from '../../../../assets/icons/download.svg';
import { ReactComponent as Export } from '../../../../assets/icons/foreign.svg';
import { ReactComponent as Copy } from '../../../../assets/icons/copy.svg';

import Box from '../../../components/Box';
import Icon from '../../../components/Chakra/Icon';
import Link from '../../../components/Chakra/Link';

import getWalletAddress from '../../../helpers/getWalletAddress';
import getWalletPrivateKey from '../../../helpers/getWalletPrivateKey';

import getKeyStore from '../../../helpers/getKeyStore';
import QrCodeModal from './QrCodeModal';
import getConunPass from '../../../helpers/getConunPass';

function CreateSuccess() {
  const toast = useToast();
  const [qrCode, setQrCode] = useState(undefined);

  const exportKeyStore = async () => {
    const res = await ipcRenderer.invoke('export-key-store', {
      keyStore: getKeyStore(),
    });

    if (res?.success) {
      toast({
        title: 'File saved',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Something went wrong.',
        description: 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const exportQrCode = async () => {
    const res = await ipcRenderer.invoke('create-qr-code', {
      privateKey: getWalletPrivateKey(),
      password: getConunPass(),
    });
    setQrCode(res);
  };

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
            <Text>WALLET ADDRESS</Text> <Text>{getWalletAddress()}</Text>
            <Icon icon={Copy} width={18} height={18} />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>PRIVATE KEY</Text>
            <Text>{getWalletPrivateKey()}</Text>
            <Icon icon={Copy} width={18} height={18} />
          </HStack>
        </Stack>
        <Flex>
          <Button
            type="button"
            width="49%"
            onClick={exportKeyStore}
            mr="2%"
            variant="link"
          >
            <Box bgColor="grey" width="100%" height="100%" p="1rem" noStyle>
              <Text textAlign="left" color="black" fontWeight="light">
                Backup Wallet <br /> KeyStoreFile.json
              </Text>
              <Icon ml="auto" icon={Download} width={30} height={30} />
            </Box>
          </Button>
          <Button
            type="button"
            width="49%"
            onClick={exportQrCode}
            variant="link"
          >
            <Box bgColor="grey" width="100%" height="100%" p="1rem" noStyle>
              <Text textAlign="left" color="black" fontWeight="light">
                Export Account <br /> QR Code
              </Text>
              <Icon ml="auto" icon={Export} width={30} height={30} />
            </Box>
          </Button>
        </Flex>
        <Link to="/wallet-confirm-backup">
          <Button type="button" width="100%" colorScheme="yellow">
            Next
          </Button>
        </Link>
      </Stack>
      <QrCodeModal
        isOpen={!!qrCode}
        onClose={() => setQrCode(undefined)}
        qrCodeSrc={qrCode ?? ''}
      />
    </Box>
  );
}

export default CreateSuccess;
