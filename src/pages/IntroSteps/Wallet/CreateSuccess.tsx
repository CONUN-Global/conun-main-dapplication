import React, { useState } from "react";
import { ipcRenderer, clipboard } from "electron";
import { Flex, HStack, Stack, Text, useToast } from "@chakra-ui/react";

import Box from "../../../components/Box";
import Icon from "../../../components/Chakra/Icon";
import ConfirmModal from "./ConfirmModal";
import MotionWrapper from "../../../components/MotionWrapper";
import Button from "../../../components/Button";

import getWalletAddress from "../../../helpers/getWalletAddress";
import getWalletPrivateKey from "../../../helpers/getWalletPrivateKey";

import getKeyStore from "../../../helpers/getKeyStore";
import QrCodeModal from "./QrCodeModal";
import getConunPass from "../../../helpers/getConunPass";

import { ReactComponent as Download } from "../../../assets/icons/download.svg";
import { ReactComponent as Export } from "../../../assets/icons/foreign.svg";
import { ReactComponent as Copy } from "../../../assets/icons/copy.svg";

import { introVariants } from "../../../const";

function CreateSuccess() {
  const toast = useToast();
  const [qrCode, setQrCode] = useState(undefined);
  const [confirmModal, setConfirmModal] = useState(false);

  const exportKeyStore = async () => {
    const res = await ipcRenderer.invoke("export-key-store", {
      keyStore: getKeyStore(),
    });

    if (res?.success) {
      toast({
        title: "File saved",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else if (!res.canceled) {
      toast({
        title: "Something went wrong.",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const exportQrCode = async () => {
    const res = await ipcRenderer.invoke("create-qr-code", {
      privateKey: getWalletPrivateKey(),
      password: getConunPass(),
    });
    setQrCode(res);
  };

  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: "spring" }}
    >
      <Box elevation={2} padding="2rem">
        <Stack spacing="2rem">
          <Text textAlign="center" fontSize="2rem">
            Account Created Successfully
          </Text>
          <Text textAlign="justify" fontSize="1.2rem">
            Welcome to CONUN Distributed Supercomputing Platform. Please backup
            your account information and Download QR Code.
          </Text>
          <Stack bgColor="#5a78f0" color="#fff" p="1rem" borderRadius="5px">
            <HStack justifyContent="space-between">
              <Text fontSize="1rem">WALLET ADDRESS</Text>{" "}
              <Text fontSize="1rem">{getWalletAddress()}</Text>
              <Button
                pure
                _hover={{ bgColor: "transparent" }}
                variant="ghost"
                onClick={() => {
                  clipboard.writeText(getWalletAddress());
                  toast({
                    title: "Wallet address copied",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
                }}
              >
                <Icon icon={Copy} width={18} height={18} fill="#fff" />
              </Button>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="1rem">PRIVATE KEY</Text>
              <Text fontSize="1rem">{getWalletPrivateKey()}</Text>
              <Button
                pure
                _hover={{ bgColor: "transparent" }}
                variant="ghost"
                onClick={() => {
                  clipboard.writeText(getWalletPrivateKey());
                  toast({
                    title: "Private key copied",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
                }}
              >
                <Icon icon={Copy} width={18} height={18} fill="#fff" />
              </Button>
            </HStack>
          </Stack>
          <Flex>
            <Button
              type="button"
              width="49%"
              onClick={exportKeyStore}
              mr="2%"
              variant="link"
            >
              <Box
                width="100%"
                height="100%"
                p="1rem"
                bgColor="#7070e3"
                noStyle
              >
                <Text color="#fff" textAlign="left">
                  Backup Wallet <br /> KeyStoreFile.json
                </Text>
                <Icon
                  ml="auto"
                  icon={Download}
                  width={25}
                  height={25}
                  fill="#fff"
                />
              </Box>
            </Button>
            <Button
              type="button"
              width="49%"
              onClick={exportQrCode}
              variant="link"
            >
              <Box
                bgColor="#25b0e8"
                color="#fff"
                width="100%"
                height="100%"
                p="1rem"
                noStyle
              >
                <Text textAlign="left" color="#fff">
                  Export Account <br /> QR Code
                </Text>
                <Icon
                  ml="auto"
                  icon={Export}
                  width={25}
                  height={25}
                  fill="#fff"
                />
              </Box>
            </Button>
          </Flex>

          <Button
            type="button"
            width="100%"
            onClick={() => setConfirmModal(true)}
            colorScheme="yellow"
          >
            Next
          </Button>
        </Stack>
        <QrCodeModal
          isOpen={!!qrCode}
          onClose={() => setQrCode(undefined)}
          qrCodeSrc={qrCode ?? ""}
        />
        <ConfirmModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
        />
      </Box>
    </MotionWrapper>
  );
}

export default CreateSuccess;
