import { useQuery } from "react-query";

import instance from "../axios/instance";
import useCurrentUser from "./useCurrentUser";

const checkUser = async (email: string) => {
  const { data } = await instance.get(`/users/check/?email=${email}`);

  return data;
};

function useUserCheck() {
  const { currentUser, isLoading: currentUserLoading } = useCurrentUser();

  const { data, isLoading } = useQuery(
    "check-user",
    () => checkUser(currentUser?.email),
    {
      enabled: !currentUserLoading && !!currentUser?.email,
    }
  );

  return {
    isAlreadyUser: data?.success,
    isLoading,
  };
}

export default useUserCheck;
