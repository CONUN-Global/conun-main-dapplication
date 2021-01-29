import React from 'react';
import { ipcRenderer } from 'electron';
import { Img, Stack, useToast } from '@chakra-ui/react';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeSrc: string;
}

function QrCodeModal({ isOpen, onClose, qrCodeSrc }: QrCodeModalProps) {
  const toast = useToast();

  const downloadQrCode = async () => {
    const res = await ipcRenderer.invoke('download-qr-code', {
      qrCode: qrCodeSrc,
    });
    if (res?.success) {
      toast({
        title: 'QR Code saved',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (!res.canceled) {
      toast({
        title: 'Something went wrong.',
        description: 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseButton isCentered>
      <Stack mb="1rem">
        <Img width="100%" src={qrCodeSrc} alt="QR code" />
        <Button colorScheme="yellow" onClick={downloadQrCode}>
          Download
        </Button>
      </Stack>
    </Modal>
  );
}

export default QrCodeModal;
