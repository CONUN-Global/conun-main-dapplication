import React from 'react';
import { Box as ChakraBox, BoxProps } from '@chakra-ui/react';
import elevations from './elevations';

interface CustomBoxProps extends BoxProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12 | 16 | 24;
  noStyle?: boolean;
}

function Box({
  children,
  elevation = 0,
  noStyle = false,
  ...props
}: CustomBoxProps) {
  if (noStyle) {
    <ChakraBox {...props}>{children}</ChakraBox>;
  }

  return (
    <ChakraBox
      boxShadow={elevations[elevation]}
      borderRadius={5}
      bgColor="white"
      {...props}
    >
      {children}
    </ChakraBox>
  );
}

export default Box;
