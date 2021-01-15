import React from 'react';
import { chakra, ChakraStyleProps } from '@chakra-ui/react';

interface IconProps extends ChakraStyleProps {
  icon: any;
}

function Icon({ icon, ...props }: IconProps) {
  const ChakraIcon = chakra(icon);
  return <ChakraIcon {...props} />;
}

export default Icon;
