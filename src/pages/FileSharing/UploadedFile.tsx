import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

import ExtensionIcon from "../../components/ExtensionIcon";

import checkmark from "../../assets/icons/check.svg";

interface UploadedFileProps {
  file: {
    name: string;
    hash?: string;
    path: string;
  };
}

function UploadedFile({ file }: UploadedFileProps) {
  const { onCopy } = useClipboard(file.hash || "");

  const toast = useToast();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <HStack justifyContent="space-around" fontSize="0.8rem">
        <ExtensionIcon
          type={file?.name?.split(".")?.pop() ?? ""}
          width="3.5rem"
        />
        <Stack width="100%" spacing="0">
          <Text fontWeight="bold">{file.name}</Text>
          <Button
            type="button"
            variant="ghost"
            fontSize="0.8rem"
            justifyContent="flex-start"
            width="fit-content"
            padding="0 0.5rem"
            fontWeight="light"
            _focus={{ outline: "none" }}
            color="#5153FF"
            _hover={{ bgColor: "transparent", textDecoration: "underline" }}
            onClick={() => {
              onCopy();
              toast({
                title: "Hash Copied",
                status: "success",
                duration: 500,
              });
            }}
          >
            {file.hash}
          </Button>
        </Stack>
        {file.hash ? (
          <Image src={checkmark} alt="checkmark" width="35px" />
        ) : (
          <Spinner width="35px" />
        )}
      </HStack>
    </motion.div>
  );
}

export default UploadedFile;
