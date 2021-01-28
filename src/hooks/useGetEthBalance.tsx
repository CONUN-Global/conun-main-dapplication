import { ipcRenderer } from 'electron';
import { useQuery } from 'react-query';

import useAppCurrentUser from './useAppCurrentUser';

const getEthBalance = async (address: string) => {
  const data = await ipcRenderer.invoke('get-eth-balance', { address });
  return data;
};

function useGetEthBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    'get-eth-balance',
    () => getEthBalance(currentUser.wallet_address),
    {
      enabled: !!currentUser.wallet_address,
    }
  );

  return { balance: data, loading: isLoading, refetch, isFetching };
}

export default useGetEthBalance;
