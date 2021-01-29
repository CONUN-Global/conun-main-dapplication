import React from 'react';
import { HStack, Stack, Text, useToast } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';
import Input from '../../../components/Form/Chakra/Input';
import Form from '../../../components/Chakra/Form';
import Link from '../../../components/Chakra/Link';
import DragnDropInput from '../../../components/DropFile';
import MotionWrapper from '../../../components/MotionWrapper';
import Button from '../../../components/Button';

import { useAppContext } from '../../../components/AppContext';
import useLogin from '../../../hooks/useLogin';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useKeyGenerator from '../../../hooks/useKeyGenerator';
import useUserCheck from '../../../hooks/useUserCheck';
import useSignup from '../../../hooks/useSignup';

import { setConunPass } from '../../../helpers/getConunPass';
import getPublicKey from '../../../helpers/getPublicKey';

import { introVariants, ORG_NAME } from '../../../const';

type FormData = {
  password: string;
  file: any;
};

function KeyStoreImport() {
  const { handleWalletCreation, onLogin, isAlreadyUser } = useAppContext();

  const { login, loading } = useLogin();

  const { signup, loading: signupLoading } = useSignup();

  const { generate, isLoading: keysLoading } = useKeyGenerator();

  const { walletAddress } = useUserCheck();

  const { currentUser } = useCurrentUser();

  const { register, handleSubmit, errors, control } = useForm<FormData>();

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
              keyStore: JSON.stringify(e.target.result),
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
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: 'spring' }}
    >
      <Box elevation={4} padding="2rem" minWidth="30rem">
        <Stack spacing="2rem">
          <Text textAlign="center" fontSize="2rem">
            Import with KeyStore.json file
          </Text>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="1rem">
              <Controller
                control={control}
                name="file"
                render={({ onChange }) => (
                  <>
                    <DragnDropInput accept=".json" onDrop={onChange} />
                    {errors?.file?.message && (
                      <Text
                        fontSize="0.8rem"
                        marginTop="0rem !important"
                        color="red.600"
                        textAlign="right"
                      >
                        {errors?.file?.message}
                      </Text>
                    )}
                  </>
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Please upload the keystore file',
                  },
                }}
                defaultValue=""
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
                  isLoading={loading || keysLoading || signupLoading}
                  flex="1"
                  colorScheme="yellow"
                >
                  Import Wallet
                </Button>
              </HStack>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default KeyStoreImport;
