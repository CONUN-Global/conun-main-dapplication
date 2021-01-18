import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

interface ModalProps extends ChakraModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  withCloseButton?: boolean;
}

function Modal({
  children,
  isOpen,
  onClose,
  title,
  withCloseButton,
  ...props
}: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        {withCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
