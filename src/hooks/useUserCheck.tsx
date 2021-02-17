import { useQuery } from "react-query";

import instance from "../axios/instance";
import useCurrentUser from "./useCurrentUser";

const checkUser = (currentUser: { email: string }) =>
  instance.get(`/users/check/?email=${currentUser?.email}`);

function useUserCheck() {
  const { currentUser, loading } = useCurrentUser();

  const { data, isLoading } = useQuery(
    "check-user",
    () => checkUser(currentUser),
    {
      enabled: !loading && !!currentUser.email,
    }
  );

  return {
    isUser: !!data?.data?.message?.email,
    email: data?.data?.message?.email,
    walletAddress: data?.data?.message?.wallet_address,
    loading: isLoading,
  };
}

export default useUserCheck;
