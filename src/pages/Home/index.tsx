import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Center, Flex, Stack, Text } from '@chakra-ui/react';

import CustomInput from '../../components/Form/Chakra/Input';
import Form from '../../components/Chakra/Form';
import Link from '../../components/Chakra/Link';
import Icon from '../../components/Chakra/Icon';
import MotionWrapper from '../../components/MotionWrapper';

import { ReactComponent as Wallet } from '../../../assets/icons/wallet.svg';

type FormData = {
  search: string;
};

function Home() {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <MotionWrapper
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -400, opacity: 0 }}
      transition={{
        duration: 0.5,
        damping: 12,
        stiffness: 100,
      }}
    >
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
            <Button
              bgColor="#5a78f0"
              type="submit"
              color="white"
              ml="0.5rem"
              _hover={{ bgColor: '#7c94f3' }}
            >
              Search
            </Button>
          </Flex>
        </Form>
        <Center>
          <Link to="/wallet">
            <Stack>
              <Icon icon={Wallet} width={70} height={70} fill="#3E5265" />
              <Text textAlign="center" color="#3E5265">
                Wallet
              </Text>
            </Stack>
          </Link>
        </Center>
      </Stack>
    </MotionWrapper>
  );
}

export default Home;
