import React from 'react';
import { Button, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';
import Input from '../../../components/Form/Input';
import Form from '../../../components/Chakra/Form';
import { useAppContext } from '../../../components/AppContext';
import Link from '../../../components/Chakra/Link';

import { setConunPass } from '../../../helpers/getConunPass';

type FormData = {
  password: string;
  file: any;
};

function KeyStoreImport() {
  const { handleWalletCreation } = useAppContext();

  const { register, handleSubmit, errors } = useForm<FormData>();

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ file, password }) => {
    const jsonFile = file[0];
    const reader = new FileReader();
    reader.readAsText(jsonFile, 'UTF-8');
    reader.onload = async (e) => {
      if (e?.target?.result) {
        const res = await ipcRenderer.invoke('validate-keystore-file', {
          file: e.target.result,
          password,
        });
        if (res.success) {
          handleWalletCreation({
            address: res.address,
            privateKey: res.privateKey,
            keyStore: JSON.stringify(e.target.result),
          });
          setConunPass(password);

          history.replace('/home');
        } else {
          toast({
            title: 'An error ocurred',
            description: 'Make sure password and file are correct.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
        }
      }
    };
  };
  return (
    <Box elevation={4} padding="2rem" minWidth="30rem">
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Import with KeyStore.json file
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="1rem">
            <Input
              name="file"
              type="file"
              accept=".json"
              formRef={register({
                required: {
                  value: true,
                  message: 'Please upload the keystore file',
                },
              })}
              error={errors.file}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              formRef={register({
                required: { value: true, message: 'A password is required' },
              })}
              filter={['json']}
              error={errors.password}
            />
            <HStack width="100%" justifyContent="space-between">
              <Link flex="1" to="/import-wallet">
                <Button
                  width="100%"
                  type="button"
                  variant="outline"
                  colorScheme="yellow"
                >
                  Back
                </Button>
              </Link>
              <Button type="submit" flex="1" colorScheme="yellow">
                Import Wallet
              </Button>
            </HStack>
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
}

export default KeyStoreImport;
