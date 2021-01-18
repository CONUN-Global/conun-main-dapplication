import React from 'react';
import { ipcRenderer } from 'electron';
import { Button, Img } from '@chakra-ui/react';

import Modal from '../../../components/Modal';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeSrc: string;
}

function QrCodeModal({ isOpen, onClose, qrCodeSrc }: QrCodeModalProps) {
  const downloadQrCode = async () => {
    await ipcRenderer.invoke('download-qr-code', {
      qrCode: qrCodeSrc,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=" Here is your QR Code"
      withCloseButton
      isCentered
    >
      <Img width="100%" src={qrCodeSrc} alt="QR code" />
      <Button onClick={downloadQrCode}>Download</Button>
    </Modal>
  );
}

export default QrCodeModal;
