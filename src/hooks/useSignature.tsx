import { useMutation } from "react-query";

import getIdentity from "../helpers/getIdentity";

const { api } = window;

const signGenerator = async (values: any) => {
  const data = await api.signGenerator({
    ...values,
    privateKey: getIdentity()?.credentials?.privateKey,
  });
  return data;
};

function useSignature() {
  const { mutateAsync, data } = useMutation((values) => signGenerator(values));

  const getSignature = async (values: any) => {
    const signature = await mutateAsync(values);
    return signature;
  };

  return { getSignature, data };
}

export default useSignature;
