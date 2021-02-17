import React from "react";
import {
  InputGroup,
  InputLeftElement,
  Input as ChakraInput,
  InputProps,
  Container,
  Text,
  FormLabel,
} from "@chakra-ui/react";

import { FieldError } from "react-hook-form";

interface CustomInputProps extends InputProps {
  formRef: any;
  name: string;
  label?: string;
  error: FieldError | undefined;
  icon?: any;
}

function Input({ formRef, error, icon, label, ...props }: CustomInputProps) {
  const Icon = icon;
  return (
    <Container width="100%" padding="0" maxWidth="auto" position="relative">
      {label && (
        <FormLabel fontWeight="bold" mb={0}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">
            <Icon icon={icon} color="gray.300" />
          </InputLeftElement>
        )}
        <ChakraInput ref={formRef} {...props} />
      </InputGroup>
      {error?.message && (
        <Text
          position="absolute"
          fontSize="0.8rem"
          color="red.600"
          textAlign="right"
          right={0}
        >
          {error.message}
        </Text>
      )}
    </Container>
  );
}

export default Input;
