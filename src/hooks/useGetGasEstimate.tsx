import { ipcRenderer } from 'electron';
import { useQuery } from 'react-query';

import useAppCurrentUser from './useAppCurrentUser';

interface UseGetGasEstimateProps {
  to: string;
  token: string;
  amount: number;
  onComplete: (data: any) => void;
}

const getGasEstimate = async (
  from: string,
  to: string,
  token: string,
  amount: number
) => {
  const data = await ipcRenderer.invoke('get-gas-estimate', {
    from,
    to,
    token,
    amount,
  });
  return data;
};

function useGetGasEstimate({
  to,
  token,
  amount,
  onComplete,
}: UseGetGasEstimateProps) {
  const { currentUser } = useAppCurrentUser();
  const { data, isLoading } = useQuery(
    ['get-gas-estimate', to, token, amount],
    () => getGasEstimate(currentUser.wallet_address, to, token, amount),
    {
      enabled: !!currentUser.wallet_address && (!to?.length || to.length > 41),
      refetchOnMount: true,
      cacheTime: 0,
      onSuccess: onComplete,
    }
  );

  return { data, loading: isLoading };
}

export default useGetGasEstimate;
