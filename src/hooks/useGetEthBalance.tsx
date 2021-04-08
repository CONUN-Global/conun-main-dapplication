import { useQuery } from "react-query";
import instance from "../axios/instance";

import useAppCurrentUser from "./useAppCurrentUser";

function useGetEthBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    "get-eth-balance",
    async () => {
      const { data } = await instance(
        `/ether/getBalanceOfEth?walletAddress=${currentUser?.walletAddress}`
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

  return { balance: data, loading: isLoading, refetch, isFetching };
}

export default useGetEthBalance;
