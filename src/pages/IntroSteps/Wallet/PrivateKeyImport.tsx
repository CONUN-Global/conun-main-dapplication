import React from 'react';
import { Button, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import Box from '../../../components/Box';
import Input from '../../../components/Form/Input';
import Form from '../../../components/Chakra/Form';
import { useAppContext } from '../../../components/AppContext';

import Link from '../../../components/Chakra/Link';

type FormData = {
  privateKey: string;
};

function PrivateKeyImport() {
  const { handleWalletCreation } = useAppContext();

  const { register, handleSubmit, errors } = useForm<FormData>();

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ privateKey }) => {
    console.log(privateKey);
  };
  return (
    <Box elevation={4} padding="2rem" minWidth="30rem">
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Import with Private Key
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="1rem">
            <Input
              placeholder="Private Key"
              name="privateKey"
              formRef={register({
                required: { value: true, message: 'A private key is required' },
              })}
              filter={['json']}
              error={errors.privateKey}
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

export default PrivateKeyImport;
