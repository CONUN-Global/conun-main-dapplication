import React from "react";
import { chakra, IconProps as ChakraIconProps } from "@chakra-ui/react";

interface IconProps extends ChakraIconProps {
  icon: any;
}

function Icon({ icon, ...props }: IconProps) {
  if (!icon) {
    return null;
  }

  const ChakraIcon = chakra(icon);
  return <ChakraIcon {...props} />;
}

export default Icon;
