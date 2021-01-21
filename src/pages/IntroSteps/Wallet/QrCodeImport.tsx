import React from 'react';
import { Button, HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import Box from '../../../components/Box';
import Input from '../../../components/Form/Input';
import Form from '../../../components/Chakra/Form';
import Link from '../../../components/Chakra/Link';

import { useAppContext } from '../../../components/AppContext';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useKeyGenerator from '../../../hooks/useKeyGenerator';
import useLogin from '../../../hooks/useLogin';
import useUserCheck from '../../../hooks/useUserCheck';
import useSignup from '../../../hooks/useSignup';

import getPublicKey from '../../../helpers/getPublicKey';
import { setConunPass } from '../../../helpers/getConunPass';

import { ORG_NAME } from '../../../const';

type FormData = {
  password: string;
  file: any;
};

function QrCodeImport() {
  const { handleWalletCreation, onLogin, isAlreadyUser } = useAppContext();

  const { login, loading } = useLogin();

  const { signup, loading: signupLoading } = useSignup();

  const { generate, isLoading: keysLoading } = useKeyGenerator();

  const { walletAddress } = useUserCheck();

  const { register, handleSubmit, errors } = useForm<FormData>();

  const { currentUser } = useCurrentUser();

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ file, password }) => {
    const image = file[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async (e) => {
      if (e?.target?.result) {
        const res = await ipcRenderer.invoke('validate-qr-code', {
          qrCode: e.target.result,
          password,
        });

        if (res.success) {
          if (isAlreadyUser && walletAddress !== res.address) {
            toast({
              title: 'Check Wallet',
              description: 'You registered with different wallet in the past',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          } else {
            await generate();

            handleWalletCreation({
              address: res.address,
              privateKey: res.privateKey,
            });

            let signupResponse;

            if (!isAlreadyUser) {
              signupResponse = await signup({
                email: currentUser?.email,
                password,
                name: currentUser?.name,
                wallet_address: res.address,
                orgName: ORG_NAME,
                isAdmin: false,
              });
            }

            if (isAlreadyUser || signupResponse?.status === 201) {
              const loginResponse = await login({
                email: currentUser?.email,
                password,
                key: getPublicKey(),
              });

              if (loginResponse?.status === 200) {
                onLogin(
                  loginResponse?.data?.['x-auth-token'] ?? null,
                  loginResponse?.data?.user?.wallet_address
                );
                setConunPass('');
                toast({
                  title: 'Import Successful',
                  description: isAlreadyUser
                    ? 'Welcome back to your account'
                    : 'Account Created',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                  position: 'top',
                });
                history.push('/home');
              }
            }
          }
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
          Import QR Code Image
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="1rem">
            <Input
              name="file"
              type="file"
              accept="image/png"
              formRef={register({
                required: {
                  value: true,
                  message: 'Please upload an image',
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
              <Button
                type="submit"
                flex="1"
                isLoading={loading || signupLoading || keysLoading}
                colorScheme="yellow"
              >
                Import Wallet
              </Button>
            </HStack>
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
}

export default QrCodeImport;
