import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { useMutation } from 'react-query';
import {
  Button,
  Divider,
  HStack,
  ModalFooter,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

import Modal from '../../components/Modal';

import getWalletPrivateKey from '../../helpers/getWalletPrivateKey';
import getWalletAddress from '../../helpers/getWalletAddress';
import getPrivateKey from '../../helpers/getPrivateKey';
import useSignature from '../../hooks/useSignature';

import instance from '../../axios/instance';
import { FcnTypes, ORG_NAME } from '../../const';
import useAppCurrentUser from '../../hooks/useAppCurrentUser';

import { ReactComponent as Checkmark } from '../../../assets/icons/check.svg';
import Icon from '../../components/Chakra/Icon';

type Values = {
  type: string;
  amount: number;
  to: string;
  fee: number;
  gasPrice: number;
  gasLimit: number;
  isAdvanced: boolean;
} | null;

type LocalTx = {
  Func: {
    Amount: number;
    From: string;
    To: string;
  };
  Success: boolean;
  Timestamp: {
    nanos: number;
    seconds: number;
  };

  TxID: string;
} | null;

const transferHelper = async (values: Values) => {
  const data = await ipcRenderer.invoke('transfer', {
    ...values,
    from: getWalletAddress(),
    privateKey: getWalletPrivateKey(),
  });
  return data;
};

interface ConfirmTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  values: Values;
}

function ConfirmTransferModal({
  isOpen,
  onClose,
  values,
}: ConfirmTransferModalProps) {
  const [successModal, setSuccessModal] = useState<LocalTx>(null);

  const { currentUser } = useAppCurrentUser();

  const {
    mutateAsync: transfer,
    isLoading,
  } = useMutation((transferData: Values) => transferHelper(transferData));
  const {
    mutateAsync: transferLocal,
    isLoading: localTransferLoading,
  } = useMutation((transferData) =>
    instance.post(`/con-token/channels/mychannel/chaincodes/coin`, transferData)
  );

  const toast = useToast();

  const { getSignature, loading } = useSignature();

  const sendTransaction = async () => {
    if (values?.type !== 'COIN') {
      const res = await transfer(values);
      return res;
    }

    const signedData = await getSignature({
      to: values.to,
      privateKey: getPrivateKey(),
      fcn: FcnTypes.Transfer,
      orgName: ORG_NAME,
      value: Number(values.amount),
      _from: currentUser.wallet_address,
    });

    try {
      const res = await transferLocal({
        ...signedData,
        value: Number(signedData.value),
      });

      if (res?.data?.result?.Success) {
        return setSuccessModal(res?.data?.result);
      }

      return toast({
        title: 'An error occurred.',
        description: 'Unable to complete transaction',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        title: 'An error occurred.',
        description: 'Unable to complete transaction',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (!values) {
    return null;
  }

  if (successModal) {
    return (
      <Modal
        title="Transaction Succesful"
        isOpen={!!successModal}
        onClose={() => {
          onClose();
          setSuccessModal(null);
        }}
        isCentered
        size="xl"
      >
        <Stack spacing="1rem">
          <Icon
            icon={Checkmark}
            w={8}
            h={8}
            color="green.500"
            alignSelf="center"
          />
          <Text>
            Transaction ID: <strong>{successModal?.TxID}</strong>
          </Text>
          <Text>
            Amount: <strong>{successModal?.Func?.Amount}</strong>
          </Text>
          <Text>
            Timestamp:{' '}
            <strong>
              {new Date(
                successModal?.Timestamp?.seconds * 1000
              ).toLocaleString()}
            </strong>
          </Text>
        </Stack>
        <ModalFooter justifyContent="center">
          <Button
            onClick={() => {
              onClose();
              setSuccessModal(null);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
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
          To: <strong>{values?.to}</strong>
        </Text>
        <Divider />
        <Text as="div" display="flex" justifyContent="space-between">
          Amount:{' '}
          <strong>
            {values?.amount} {values.type}
          </strong>
        </Text>

        {values.type !== 'COIN' && (
          <>
            <Divider />
            <Text as="div" display="flex" justifyContent="space-between">
              Fee:{' '}
              <strong>
                {values?.fee?.toFixed(6)} {values.type}
              </strong>
            </Text>
            <Divider />
            <Text as="div" display="flex" justifyContent="space-between">
              Total:{' '}
              <strong>
                {(+values?.amount + +values?.fee).toFixed(6)} {values.type}
              </strong>
            </Text>
          </>
        )}
      </Stack>
      <HStack justifyContent="space-between" mb="1rem">
        <Button
          type="button"
          onClick={onClose}
          isDisabled={isLoading}
          disabled={isLoading || localTransferLoading || loading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          colorScheme="green"
          onClick={sendTransaction}
          isLoading={isLoading || localTransferLoading || loading}
        >
          Confirm
        </Button>
      </HStack>
    </Modal>
  );
}

export default ConfirmTransferModal;
