import React from "react";
import { Stack, Text, useToast } from "@chakra-ui/react";
import { clipboard } from "electron";

import Box from "../../components/Box";
import Icon from "../../components/Chakra/Icon";
import Button from "../../components/Button";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";

import { ReactComponent as Copy } from "../../assets/icons/copy.svg";

function Address() {
  const { currentUser } = useAppCurrentUser();
  const toast = useToast();

  return (
    <Box elevation={2} padding="25px" bgColor="#7070e3" color="#fff">
      <Stack
        alignItems="flex-start"
        height="100%"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize="22px">
          Address
        </Text>
        <Text fontSize="14px" wordBreak="break-word">
          {currentUser.wallet_address}
        </Text>
        <Button
          pure
          bgColor="transparent"
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          _focus={{ border: "none" }}
          width="auto"
          padding={0}
          minWidth="auto"
          onClick={() => {
            clipboard.writeText(currentUser.wallet_address);
            toast({
              title: "Wallet address copied",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }}
        >
          <Icon icon={Copy} fill="#fff" width="18px" height="18px" />
        </Button>
      </Stack>
    </Box>
  );
}

export default Address;
