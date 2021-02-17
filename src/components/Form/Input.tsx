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
import Icon from "../Chakra/Icon";

interface CustomInputProps extends InputProps {
  label?: string;
  error: FieldError | undefined;
  icon?: any;
}

function Input({ icon, error, label, ...props }: CustomInputProps) {
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
        <ChakraInput {...props} />
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
