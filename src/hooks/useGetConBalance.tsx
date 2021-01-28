import { ipcRenderer } from 'electron';
import { useQuery } from 'react-query';

import useAppCurrentUser from './useAppCurrentUser';

const getConBalance = async (address: string) => {
  const data = await ipcRenderer.invoke('get-con-balance', { address });
  return data;
};

function useGetConBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    'get-con-balance',
    () => getConBalance(currentUser.wallet_address),
    {
      enabled: !!currentUser.wallet_address,
    }
  );

  return { balance: data, loading: isLoading, refetch, isFetching };
}

export default useGetConBalance;
