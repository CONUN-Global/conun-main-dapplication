import { useQuery } from "react-query";

import useAppCurrentUser from "./useAppCurrentUser";

import instance from "../axios/instance";

import { FcnTypes, ORG_NAME } from "../const";

function useGetConTokenBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    "balance",
    async () => {
      const { data } = await instance.get(
        `/con-token/channels/mychannel/chaincodes/conos?walletAddress=${currentUser?.walletAddress}&orgName=${ORG_NAME}&fcn=${FcnTypes.BalanceOf}`
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
