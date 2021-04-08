import { useMutation } from "react-query";

import instance from "../axios/instance";

const { api } = window;

function useLogin() {
  const { mutateAsync: login, isLoading } = useMutation(
    async (loginData: any) => {
      const { data } = await instance.post("/auth", loginData);
      await api.savePass(loginData);
      return data;
    }
  );
  return { login, loading: isLoading };
}

export default useLogin;
