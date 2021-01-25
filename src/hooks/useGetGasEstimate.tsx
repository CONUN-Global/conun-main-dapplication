import { ipcRenderer } from 'electron';
import { useQuery } from 'react-query';

import useAppCurrentUser from './useAppCurrentUser';

interface UseGetGasEstimateProps {
  to: string;
}

const getGasEstimate = async (from: string, to: string) => {
  const data = await ipcRenderer.invoke('get-gas-estimate', { from, to });
  return data;
};

function useGetGasEstimate({ to }: UseGetGasEstimateProps) {
  const { currentUser } = useAppCurrentUser();
  const { data, isLoading } = useQuery(
    ['get-gas-estimate', to],
    () => getGasEstimate(currentUser.wallet_address, to),
    {
      enabled: !!currentUser.wallet_address && (!to?.length || to.length > 41),
      refetchOnMount: true,
    }
  );

  return { data, loading: isLoading };
}

export default useGetGasEstimate;
