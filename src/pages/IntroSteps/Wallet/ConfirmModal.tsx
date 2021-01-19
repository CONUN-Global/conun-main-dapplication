import React from 'react';
import {
  Button,
  Checkbox,
  HStack,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Box from '../../../components/Box';
import Form from '../../../components/Chakra/Form';
import Modal from '../../../components/Modal';

type FormData = {
  jsonFile: boolean;
  qrCode: boolean;
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      jsonFile: false,
      qrCode: false,
    },
  });

  const history = useHistory();

  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = ({ jsonFile, qrCode }) => {
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
      history.push('/home');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <Box mt="1rem" mb="2rem">
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
            <Stack mb="2rem">
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
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
