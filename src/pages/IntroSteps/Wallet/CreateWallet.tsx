import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';

import Form from '../../../components/Chakra/Form';
import Input from '../../../components/Form/Input';

type FormData = {
  password: string;
  confirmPassword: string;
};

function CreateWallet() {
  const { register, handleSubmit, errors, getValues } = useForm<FormData>();

  const history = useHistory();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    history.push('/create-wallet-success');
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
