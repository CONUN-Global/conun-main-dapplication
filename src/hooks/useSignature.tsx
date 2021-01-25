import { ipcRenderer } from 'electron';
import { useMutation } from 'react-query';
import getPrivateKey from '../helpers/getPrivateKey';

const signGenerator = async (values: any) => {
  const data = await ipcRenderer.invoke('generate-sign', {
    ...values,
    privateKey: getPrivateKey(),
  });
  return data;
};

function useSignature() {
  const { mutateAsync, data, isLoading } = useMutation((values) =>
    signGenerator(values)
  );

  const getSignature = async (values: any) => {
    const signature = await mutateAsync(values);

    return signature;
  };

  return { getSignature, data, loading: isLoading };
}

export default useSignature;
