import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import getFileIcon from '../../helpers/getFileIcon';

interface ExtensionIconProps extends ImageProps {
  type: string;
}

function ExtensionIcon({ type, ...props }: ExtensionIconProps) {
  return <Image src={getFileIcon(type)} {...props} />;
}

export default ExtensionIcon;
