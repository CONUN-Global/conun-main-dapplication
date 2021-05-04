import { useQuery } from "react-query";

import useAppCurrentUser from "./useAppCurrentUser";

import instance from "../axios/instance";

import {
  FcnTypes,
  ORG_NAME,
  SMART_CONTRACT_DEV,
  SMART_CONTRACT_PROD,
} from "../const";

const SMART_CONTRACT =
  process.env.NODE_ENV === "development"
    ? SMART_CONTRACT_DEV
    : SMART_CONTRACT_PROD;

function useGetConTokenBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    "balance",
    async () => {
      const { data } = await instance.get(
        `/con-token/channels/mychannel/chaincodes/${SMART_CONTRACT}?walletAddress=${currentUser?.walletAddress}&orgName=${ORG_NAME}&fcn=${FcnTypes.BalanceOf}`
      );
      return data;
    },
    {
      enabled: !!currentUser.walletAddress,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  return {
    balance: data,
    loading: isLoading,
    refetch,
    isFetching,
  };
}

export default useGetConTokenBalance;
