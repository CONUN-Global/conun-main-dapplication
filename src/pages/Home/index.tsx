import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import CustomInput from '../../components/Form/Input';

type FormData = {
  search: string;
};

function Home() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Stack spacing="1rem">
      <Text fontSize="2rem">Conun</Text>
      <form onSubmit={onSubmit}>
        <Flex>
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
          <Button colorScheme="blue" type="submit" ml="0.5rem">
            Search
          </Button>
        </Flex>
      </form>
    </Stack>
  );
}

export default Home;
