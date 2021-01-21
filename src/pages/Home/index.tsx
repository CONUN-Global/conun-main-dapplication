import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Center, Flex, Stack, Text } from '@chakra-ui/react';

import CustomInput from '../../components/Form/Input';
import Form from '../../components/Chakra/Form';
import Link from '../../components/Chakra/Link';

import { ReactComponent as Wallet } from '../../../assets/icons/wallet.svg';

type FormData = {
  search: string;
};

function Home() {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <Stack spacing="1rem">
      <Form onSubmit={onSubmit} mb="4rem">
        <Flex width="80vw">
          <CustomInput
            name="search"
            placeholder="Search..."
            formRef={register({
              required: {
                value: true,
                message: 'Please provide a search value',
              },
            })}
            error={errors.search}
          />
          <Button colorScheme="yellow" type="submit" ml="0.5rem">
            Search
          </Button>
        </Flex>
      </Form>
      <Center>
        <Link to="/wallet">
          <Stack>
            <Wallet style={{ width: 70, height: 70 }} />
            <Text color="black" textAlign="center">
              Wallet
            </Text>
          </Stack>
        </Link>
      </Center>
    </Stack>
  );
}

export default Home;
