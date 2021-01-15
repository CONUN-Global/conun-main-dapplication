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
import Link from '../../../components/Chakra/Link';
import Form from '../../../components/Chakra/Form';

type FormData = {
  jsonFile: boolean;
  qrCode: boolean;
};

function ConfirmBackup() {
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
        title: 'Back Confirmation',
        description: 'Please confirm that have created a backup.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      history.push('/home');
    }
  };

  return (
    <Box>
      <Stack spacing="2rem">
        <Text textAlign="center" fontSize="2rem">
          Did you backup your account information?
        </Text>
        <Text textAlign="justify">
          Haven&apos;t done so could result in a complete loss of your account,
          please check the boxes below to confirm
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack mb="2rem">
            <Checkbox name="jsonFile" ref={register}>
              Exported KeysStoreFile.json
            </Checkbox>
            <Checkbox name="qrCode" ref={register}>
              Exported QR Code
            </Checkbox>
          </Stack>
          <HStack>
            <Link to="/create-wallet-success" width="100%">
              <Button
                type="button"
                variant="outline"
                width="100%"
                colorScheme="yellow"
              >
                Back
              </Button>
            </Link>
            <Button type="submit" width="100%" colorScheme="yellow">
              Next
            </Button>
          </HStack>
        </Form>
      </Stack>
    </Box>
  );
}

export default ConfirmBackup;
