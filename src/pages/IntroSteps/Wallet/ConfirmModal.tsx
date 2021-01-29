import React from 'react';
import {
  Center,
  Checkbox,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';
import Form from '../../../components/Chakra/Form';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

import { useAppContext } from '../../../components/AppContext';

import useCurrentUser from '../../../hooks/useCurrentUser';
import useKeyGenerator from '../../../hooks/useKeyGenerator';
import useSignup from '../../../hooks/useSignup';
import useLogin from '../../../hooks/useLogin';

import getConunPass, { setConunPass } from '../../../helpers/getConunPass';
import getWalletAddress from '../../../helpers/getWalletAddress';

import { ORG_NAME } from '../../../const';

import styles from '../../../styles/overrides.module.css';

type FormData = {
  jsonFile: boolean;
  qrCode: boolean;
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const { onLogin } = useAppContext();
  const { currentUser } = useCurrentUser();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      jsonFile: false,
      qrCode: false,
    },
  });

  const { generate, isLoading: keysLoading } = useKeyGenerator();

  const { signup, loading: signupLoading } = useSignup();

  const { login, loading: loginLoading } = useLogin();

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = async ({ jsonFile, qrCode }) => {
    if (!jsonFile && !qrCode) {
      toast({
        title: 'Backup Confirmation',
        description: 'Please confirm that you have created a backup.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top',
      });
    } else {
      const { publicKey } = await generate();

      try {
        const signupResponse = await signup({
          email: currentUser?.email,
          password: getConunPass(),
          name: currentUser?.name,
          wallet_address: getWalletAddress(),
          orgName: ORG_NAME,
          isAdmin: false,
        });

        if (signupResponse?.status === 201) {
          const loginResponse = await login({
            email: currentUser?.email,
            password: getConunPass(),
            key: publicKey,
          });

          if (loginResponse?.status === 200) {
            onLogin(
              loginResponse?.data?.['x-auth-token'] ?? null,
              loginResponse?.data?.user?.wallet_address
            );
            setConunPass('');
            history.push('/home');
          }
        }
      } catch (error) {
        toast({
          title: 'An error occurred.',
          description: 'Unable to signup user',
          position: 'top',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <Box mt="1rem" mb="2rem">
        {keysLoading || signupLoading || loginLoading ? (
          <Center height="330px">
            <Spinner color="yellow" size="xl" emptyColor="gray.200" />
          </Center>
        ) : (
          <Stack spacing="2rem">
            <Text textAlign="center" fontSize="2rem">
              Did you backup your account information?
            </Text>
            <Text textAlign="center">
              If you haven&apos;t done so, it could result in a complete loss of
              your account.
              <br />
              Please check the boxes below to confirm.
            </Text>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack mb="2rem" className={styles.CheckboxesContainer}>
                <Checkbox name="jsonFile" ref={register}>
                  I exported my KeysStoreFile.json
                </Checkbox>
                <Checkbox name="qrCode" ref={register}>
                  I exported my QR Code
                </Checkbox>
              </Stack>
              <HStack>
                <Button
                  type="button"
                  variant="outline"
                  width="100%"
                  colorScheme="yellow"
                  onClick={onClose}
                >
                  No
                </Button>

                <Button type="submit" width="100%" colorScheme="yellow">
                  Yes
                </Button>
              </HStack>
            </Form>
          </Stack>
        )}
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
