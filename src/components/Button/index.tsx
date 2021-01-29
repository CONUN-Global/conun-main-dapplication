import React from 'react';
import { motion } from 'framer-motion';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface BtnProps extends ButtonProps {
  pure?: boolean;
}

function Button({ bgColor, pure = false, ...props }: BtnProps) {
  if (pure) {
    return <ChakraButton bgColor={bgColor} {...props} />;
  }
  return (
    <ChakraButton
      as={motion.button}
      whileTap={{ y: '1px' }}
      transition={undefined}
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)"
      bgColor={bgColor}
      _active={{ bgColor }}
      _hover={{ filter: 'opacity(90%)' }}
      _focus={{ outline: 0 }}
      {...props}
    />
  );
}

export default Button;
