import React, { useState } from "react";
import { ipcRenderer } from "electron";
import { useMutation } from "react-query";
import {
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import Dropzone from "../../components/DropFile";
import UploadedFile from "./UploadedFile";
import Icon from "../../components/Chakra/Icon";

import { ReactComponent as Close } from "../../assets/icons/close.svg";

// import styles from './Home.module.css';

const uploadFiles = async (files: any) => {
  const data = await ipcRenderer.invoke(
    "upload-file",
    files.map((file: { path: string; name: string }) => ({
      path: file.path,
      name: file.name,
    }))
  );

  return data;
};

interface UploadProps {
  onClose: () => void;
}

function Upload({ onClose }: UploadProps) {
  const [uploadedfiles, setUploadedfiles] = useState<any[]>([]);

  const { mutateAsync: upload, isLoading } = useMutation(uploadFiles);

  const toast = useToast();

  const handleUpload = async (files: any) => {
    const filteredFiles = files.filter(
      (f: any) => !uploadedfiles.map((u) => u.name).includes(f.name)
    );

    if (!filteredFiles.length) {
      toast({
        title: "No new files added",
        status: "error",
        duration: 500,
      });
    }

    const data = await upload(filteredFiles);
    setUploadedfiles([...data, ...uploadedfiles]);
  };

  return (
    <motion.div layoutId="Upload">
      <Stack
        spacing="2rem"
        bgColor="#3182CE"
        padding="4rem 4rem"
        borderRadius="25px"
        boxShadow="0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)"
        minWidth="40rem"
        position="relative"
        color="white"
      >
        <Button
          type="button"
          onClick={onClose}
          position="absolute"
          variant="unstyled"
          top="2%"
          right="2%"
          size="sm"
        >
          <Icon icon={Close} width={25} />
        </Button>
        <Text fontSize="1.8rem" color="white" textAlign="center">
          Upload your files
        </Text>
        <Dropzone onDrop={handleUpload} />
        <Stack>
          {uploadedfiles.length && (
            <HStack justifyContent="space-between">
              <Text color="#C8C7C8" fontSize="1.2rem">
                Uploaded Files
              </Text>
              <Button
                type="button"
                variant="outline"
                color="#C8C7C8"
                size="xs"
                onClick={() => setUploadedfiles([])}
              >
                Clear
              </Button>
            </HStack>
          )}
          <Stack
            maxHeight="300px"
            overflowY="auto"
            paddingRight="0.5rem"
            // className={styles.FilesContainer}
            alignItems="center"
          >
            {isLoading && <Spinner color="#5153FF" />}
            <AnimatePresence>
              {uploadedfiles.map(
                (file: { path: string; name: string; hash?: string }) => (
                  <UploadedFile key={`${file.name}_${file.path}`} file={file} />
                )
              )}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}

export default Upload;
