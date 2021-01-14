import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputProps,
  Container,
  Text,
  FormLabel,
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form';

interface CustomInputProps extends InputProps {
  formRef: any;
  name: string;
  label?: string;
  error: FieldError | undefined;
  icon?: any;
}

function CustomInput({
  formRef,
  error,
  icon,
  label,
  ...props
}: CustomInputProps) {
  const Icon = icon;
  return (
    <Container width="100%" padding="0" maxWidth="auto">
      {label && <FormLabel fontWeight="bold">{label}</FormLabel>}
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" />
          </InputLeftElement>
        )}

        <Input ref={formRef} {...props} />
      </InputGroup>
      {error?.message && (
        <Text fontSize="0.8rem" color="red.600" textAlign="right">
          {error.message}
        </Text>
      )}
    </Container>
  );
}

export default CustomInput;
