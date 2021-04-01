import { useMutation } from "react-query";

import instance from "../axios/instance";

function useLogin() {
  const { mutateAsync: login, isLoading } = useMutation(
    async (loginData: any) => {
      const { data } = await instance.post("/auth", loginData);

      return data;
    }
  );
  return { login, loading: isLoading };
}

export default useLogin;
