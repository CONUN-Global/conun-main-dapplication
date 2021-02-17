import React from "react";
import {
  Box,
  Button as ChakraButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

import Button from "../Button";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useAppContext } from "../AppContext";

function UserBox() {
  const { currentUser } = useCurrentUser();
  const { onLogout } = useAppContext();

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <ChakraButton variant="link" _focus={{ outline: 0 }}>
          <Image
            src={currentUser?.picture}
            height={35}
            width={35}
            borderRadius="50%"
          />
        </ChakraButton>
      </PopoverTrigger>
      <PopoverContent
        boxShadow="0 2px 10px rgba(0,0,0,.2)"
        mr="1rem"
        padding="1rem"
        border="none"
        _focus={{ outline: 0 }}
      >
        <PopoverArrow />
        <PopoverBody>
          <Stack alignItems="center">
            <Image
              src={currentUser?.picture}
              height={75}
              width={75}
              borderRadius="50%"
            />
            <Box textAlign="center" mb="1rem">
              <Text>{currentUser?.name}</Text>
              <Text fontSize="0.8rem" color="grey">
                {currentUser?.email}
              </Text>
            </Box>
            <Button
              type="button"
              size="sm"
              onClick={handleLogout}
              colorScheme="red"
            >
              Logout
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default UserBox;
