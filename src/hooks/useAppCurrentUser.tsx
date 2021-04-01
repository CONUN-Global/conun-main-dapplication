import { useQuery } from "react-query";

import instance from "../axios/instance";
import getAuthHeader from "../helpers/getAuthHeader";

const getCurrentUser = async () => {
  const { data } = await instance.get("/users/me");
  return data;
};

function useAppCurrentUser() {
  const { data, isLoading, refetch } = useQuery("currentUser", getCurrentUser, {
    enabled: !!getAuthHeader(),
  });

  return { currentUser: data?.payload ?? null, isLoading, refetch };
}

export default useAppCurrentUser;
