import React from 'react';
import { HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { ipcRenderer } from 'electron';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';
import MotionWrapper from '../../../components/MotionWrapper';
import Form from '../../../components/Chakra/Form';
import Input from '../../../components/Form/Chakra/Input';
import Link from '../../../components/Chakra/Link';
import Button from '../../../components/Button';

import { useAppContext } from '../../../components/AppContext';

import { setConunPass } from '../../../helpers/getConunPass';

import { introVariants } from '../../../const';

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
        title: 'Error',
        description: 'Something went wrong please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: 'spring' }}
    >
      <Box elevation={2} padding="2rem">
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
              <Stack spacing="1.5rem">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  formRef={register({
                    required: { value: true, message: 'Password is required' },
                    minLength: {
                      value: 5,
                      message: 'Password must be at least 5 characters long',
                    },
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
                <HStack width="100%">
                  <Link flex="1" to="/wallet-options">
                    <Button
                      width="100%"
                      type="button"
                      variant="outline"
                      colorScheme="yellow"
                    >
                      Back
                    </Button>
                  </Link>
                  <Button flex="1" type="submit" colorScheme="yellow">
                    Save and Continue
                  </Button>
                </HStack>
              </Stack>
            </Form>
          </Stack>
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default CreateWallet;
