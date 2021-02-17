import React from "react";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";

import Box from "../../../components/Box";
import Link from "../../../components/Chakra/Link";
import Button from "../../../components/Button";
import MotionWrapper from "../../../components/MotionWrapper";

import { useAppContext } from "../../../components/AppContext";

import { introVariants } from "../../../const";
import useCurrentUser from "../../../hooks/useCurrentUser";

function ImportWallet() {
  const { isAlreadyUser, onLogout } = useAppContext();

  const { currentUser } = useCurrentUser();

  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: "spring" }}
    >
      <Box elevation={4} padding="2rem" minWidth="30rem">
        <Stack spacing="2rem">
          {isAlreadyUser ? (
            <Stack alignItems="center">
              <Image
                src={currentUser.picture}
                height={20}
                width={20}
                borderRadius="50%"
              />
              <Text textAlign="center" fontSize="2rem">
                Welcome back {currentUser.givenName ?? currentUser.name}
              </Text>
              <HStack>
                <Text fontSize="0.875rem">Not you?</Text>
                <Button
                  type="button"
                  variant="link"
                  pure
                  colorScheme="red"
                  size="sm"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </HStack>
            </Stack>
          ) : (
            <Text textAlign="center" fontSize="2rem">
              Choose Access Method
            </Text>
          )}
          <Text textAlign="center">
            {isAlreadyUser
              ? "Let's restore your previous wallet "
              : "Access your existing Ethereum-based wallet."}
            <br />
          </Text>
          <Stack spacing="1rem" mb="1rem">
            <Link to="/import-keystore" width="100%">
              <Button colorScheme="yellow" width="inherit">
                KeyStoreFile.json
              </Button>
            </Link>
            <Link to="/import-qr-code" width="100%">
              <Button colorScheme="yellow" width="inherit">
                QR Code
              </Button>
            </Link>
            <Link to="/import-private-key" width="100%">
              <Button colorScheme="yellow" width="inherit">
                Private Key
              </Button>
            </Link>
          </Stack>
          {!isAlreadyUser && (
            <Link to="/wallet-options">
              <Button
                width="100%"
                type="button"
                variant="outline"
                colorScheme="yellow"
              >
                Back
              </Button>
            </Link>
          )}
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default ImportWallet;
