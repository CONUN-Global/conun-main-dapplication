import { useMutation } from "react-query";

import instance from "../axios/instance";

import { FcnTypes, ORG_NAME, WALLET_TYPE } from "../const";
import useAppCurrentUser from "./useAppCurrentUser";
import usePass from "./usePass";
import useSignature from "./useSignature";

type Values = {
  type: string;
  amount: number;
  to: string;
  fee: string;
  gasPrice: number;
  gasLimit: number;
  isAdvanced: boolean;
} | null;

interface UseTransferProps {
  token: string;
}

async function transferHelper(token, values, fromAddress, pass) {
  if (token === "con") {
    const { data } = await instance.post("/ether/SendCON", {
      fromAddress,
      toAddress: values.to,
      value: values.amount,
      gasLimit: String(values.gasLimit),
      gasPrice: String(values.gasPrice),
      password: pass,
      walletType: WALLET_TYPE,
      orgName: ORG_NAME,
    });

    return data;
  }

  const { data } = await instance.post("/ether/SendETH", {
    fromAddress,
    toAddress: values.to,
    value: values.amount,
    gasLimit: String(values.gasLimit),
    gasPrice: String(values.gasPrice),
    password: pass,
    walletType: WALLET_TYPE,
    orgName: ORG_NAME,
  });

  return data;
}

function useTransfer({ token }: UseTransferProps) {
  const { currentUser } = useAppCurrentUser();
  const { getSignature } = useSignature();
  const { pass } = usePass();

  const {
    mutateAsync: transfer,
    isLoading,
  } = useMutation((transferData: Values) =>
    transferHelper(token, transferData, currentUser?.walletAddress, pass)
  );

  const {
    mutateAsync: transferLocal,
    isLoading: localTransferLoading,
  } = useMutation(async (transferData: any) => {
    const { signature } = await getSignature({
      string: JSON.stringify({
        fcn: FcnTypes.Transfer,
        orgName: ORG_NAME,
        fromAddress: currentUser?.walletAddress,
        toAddress: transferData.to,
        value: Number(transferData.amount),
      }),
    });
    if (signature) {
      const { data } = await instance.post(
        "/con-token/channels/mychannel/chaincodes/conos",
        {
          fcn: FcnTypes.Transfer,
          orgName: ORG_NAME,
          fromAddress: currentUser?.walletAddress,
          toAddress: transferData.to,
          value: Number(transferData.amount),
          signature,
        }
      );

      return data;
    }
  });

  return {
    transfer: token === "conx" ? transferLocal : transfer,
    loading: isLoading || localTransferLoading,
  };
}

export default useTransfer;
