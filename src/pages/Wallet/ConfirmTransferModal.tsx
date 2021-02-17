import React, { useState } from "react";
import { ipcRenderer } from "electron";
import { useMutation } from "react-query";
import {
  Divider,
  HStack,
  Link,
  ModalFooter,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import Modal from "../../components/Modal";
import Icon from "../../components/Chakra/Icon";
import Button from "../../components/Button";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";
import useGetLocalConBalance from "../../hooks/useLocalConBalance";
import useGetEthBalance from "../../hooks/useGetEthBalance";
import useGetConBalance from "../../hooks/useGetConBalance";
import useSignature from "../../hooks/useSignature";

import getWalletPrivateKey from "../../helpers/getWalletPrivateKey";
import getWalletAddress from "../../helpers/getWalletAddress";
import getPrivateKey from "../../helpers/getPrivateKey";

import instance from "../../axios/instance";
import { FcnTypes, ORG_NAME } from "../../const";

import { ReactComponent as Checkmark } from "../../assets/icons/check.svg";

type Values = {
  type: string;
  amount: number;
  to: string;
  fee: string;
  gasPrice: number;
  gasLimit: number;
  isAdvanced: boolean;
} | null;

type LocalTx = {
  Func: {
    Amount: number;
    From?: string;
    To?: string;
  };
  Success?: boolean;
  Timestamp?: {
    nanos: number;
    seconds: number;
  };
  TxID: string;
} | null;

const transferHelper = async (values: Values) => {
  const data = await ipcRenderer.invoke("transfer", {
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

  const { refetch } = useGetLocalConBalance();
  const { refetch: refetchEth } = useGetEthBalance();
  const { refetch: refetchCon } = useGetConBalance();

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
    if (values?.type !== "COIN") {
      const res = await transfer(values);

      if (res.success && values?.amount) {
        setSuccessModal({
          TxID: res?.transactionHash,
          Func: {
            Amount: values?.amount,
          },
        });

        if (values.type === "ETH") {
          return refetchEth();
        }
        return refetchCon();
      }

      return toast({
        title: "An error occurred.",
        description: String(res.error),
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
        setSuccessModal(res?.data?.result);
        return refetch();
      }

      return toast({
        title: "An error occurred.",
        description: "Unable to complete transaction",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        title: "An error occurred.",
        description: "Unable to complete transaction",
        position: "top",
        status: "error",
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
            w={20}
            h={20}
            color="green.500"
            alignSelf="center"
          />
          <Text wordBreak="break-word">
            Transaction ID:{" "}
            <Link
              href={`https://ropsten.etherscan.io/tx/${successModal?.TxID}`}
              isExternal
            >
              <strong>{successModal?.TxID}</strong>
            </Link>
          </Text>
          <Text>
            Amount: <strong>{successModal?.Func?.Amount}</strong>
          </Text>
          {successModal?.Timestamp?.seconds && (
            <Text>
              Timestamp:{" "}
              <strong>
                {new Date(
                  successModal?.Timestamp?.seconds * 1000
                ).toLocaleString()}
              </strong>
            </Text>
          )}
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
          To:{" "}
          <Text as="strong" wordBreak="break-word">
            {values?.to}
          </Text>
        </Text>
        <Divider />
        <Text as="div" display="flex" justifyContent="space-between">
          Amount:{" "}
          <strong>
            {values?.amount} {values.type}
          </strong>
        </Text>

        {values.type !== "COIN" && (
          <>
            <Divider />
            <Text as="div" display="flex" justifyContent="space-between">
              Fee:{" "}
              <strong>{/* {values?.fee?.toFixed(6)} {values.type} */}</strong>
            </Text>
            <Divider />
            <Text as="div" display="flex" justifyContent="space-between">
              Total:{" "}
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
