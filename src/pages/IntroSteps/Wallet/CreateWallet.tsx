import React from 'react';
import { Button, Stack, Text, useToast } from '@chakra-ui/react';
import { ipcRenderer } from 'electron';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';

import Form from '../../../components/Chakra/Form';
import Input from '../../../components/Form/Input';
import { useAppContext } from '../../../components/AppContext';
import { setConunPass } from '../../../helpers/getConunPass';

type FormData = {
  password: string;
  confirmPassword: string;
};

function CreateWallet() {
  const { handleWalletCreation } = useAppContext();
  const { register, handleSubmit, errors, getValues } = useForm<FormData>();

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    try {
      const walletData = await ipcRenderer.invoke('create-wallet', {
        password,
      });

      handleWalletCreation(walletData);
      setConunPass(password);

      history.push('/create-wallet-success');
    } catch (error) {
      toast({
        title: 'Back Confirmation',
        description: 'Something went wrong please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Set up a Password
        </Text>
        <Text textAlign="justify">
          To Create New CONUN Account and Wallet, Please Set Your Password.
          Notes: DO NOT SHARE and FORGET to save your password. You will need
          this Password + Keystore File to unlock your wallet. Password allows
          you to set as a local password, as well as unlock your wallet.
        </Text>
        <Stack>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                formRef={register({
                  required: { value: true, message: 'Password is required' },
                })}
                error={errors.password}
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                formRef={register({
                  required: { value: true, message: 'Confirm your password' },
                  validate: {
                    passwordMatch: (value) =>
                      value !== getValues().password
                        ? 'Passwords should match'
                        : '' || true,
                  },
                })}
                error={errors.confirmPassword}
              />

              <Button type="submit" colorScheme="yellow">
                Save and Continue
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CreateWallet;
