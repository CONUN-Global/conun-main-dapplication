import React from "react";
import { useForm } from "react-hook-form";

import { Flex, HStack, Stack, Text } from "@chakra-ui/react";

import CustomInput from "../../components/Form/Chakra/Input";
import Form from "../../components/Chakra/Form";
import Link from "../../components/Chakra/Link";
import Icon from "../../components/Chakra/Icon";
import MotionWrapper from "../../components/MotionWrapper";
import Button from "../../components/Button";

import { ReactComponent as Wallet } from "../../assets/icons/wallet.svg";
import { ReactComponent as FileShare } from "../../assets/icons/file-sharing.svg";

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
                  message: "Please provide a search value",
                },
              })}
              error={errors.search}
            />

            <Button bgColor="#5a78f0" type="submit" color="white" ml="0.5rem">
              Search
            </Button>
          </Flex>
        </Form>
        <HStack spacing="5rem" justifyContent="center">
          <Link to="/wallet">
            <MotionWrapper whileHover={{ y: -3 }}>
              <Stack alignItems="center">
                <Icon icon={Wallet} width={70} height={70} fill="#3E5265" />
                <Text textAlign="center" color="#3E5265">
                  Wallet
                </Text>
              </Stack>
            </MotionWrapper>
          </Link>
          <Link to="/file-sharing">
            <MotionWrapper whileHover={{ y: -3 }}>
              <Stack alignItems="center">
                <Icon icon={FileShare} width={70} height={70} fill="#3E5265" />
                <Text textAlign="center" color="#3E5265">
                  File Sharing
                </Text>
              </Stack>
            </MotionWrapper>
          </Link>
        </HStack>
      </Stack>
    </MotionWrapper>
  );
}

export default Home;
