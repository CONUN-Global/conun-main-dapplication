import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';

interface DragnDropInputProps {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  accept?: string;
}

function DragnDropInput({ onDrop, accept = '' }: DragnDropInputProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop, maxFiles: 1, multiple: false, accept });

  const acceptedFile = acceptedFiles[0];
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      {...getRootProps()}
      outline="2px dashed #CBD5E0"
      padding="1rem"
    >
      <input {...getInputProps()} />
      {acceptedFile ? (
        <Text color="inherit">{acceptedFile.name}</Text>
      ) : isDragActive ? (
        <Text color="inherit">Drop the file here</Text>
      ) : (
        <Text color="inherit">Drop your Keystore.json file here</Text>
      )}
    </Flex>
  );
}

export default DragnDropInput;
