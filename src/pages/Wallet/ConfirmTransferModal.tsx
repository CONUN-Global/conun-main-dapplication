import React from 'react';
import { Button, Divider, HStack, Stack, Text } from '@chakra-ui/react';

import Modal from '../../components/Modal';

interface ConfirmTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  values: {
    type: string;
    amount: number;
    to: string;
    fee: string;
    gasPrice: number;
    gasLimit: number;
    isAdvanced: boolean;
  } | null;
}

function ConfirmTransferModal({
  isOpen,
  onClose,
  values,
}: ConfirmTransferModalProps) {
  const sendTransaction = () => {};

  if (!values) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Transaction"
      isCentered
      size="xl"
    >
      <Stack spacing="1rem" mb="2rem">
        <Text as="div" display="flex" justifyContent="space-between">
          Amount: <strong>{values?.amount} ETH</strong>
        </Text>
        <Divider />
        <Text as="div" display="flex" justifyContent="space-between">
          Fee: <strong>{values?.fee.toFixed(6)} ETH</strong>
        </Text>
        <Divider />
        <Text as="div" display="flex" justifyContent="space-between">
          Total:{' '}
          <strong>{(+values?.amount + +values?.fee).toFixed(6)} ETH</strong>
        </Text>
      </Stack>
      <HStack justifyContent="space-between" mb="1rem">
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" colorScheme="green" onClick={sendTransaction}>
          Confirm
        </Button>
      </HStack>
    </Modal>
  );
}

export default ConfirmTransferModal;
