import { useQuery } from 'react-query';

import useAppCurrentUser from './useAppCurrentUser';

import instance from '../axios/instance';

function useGetLocalConBalance() {
  const { currentUser } = useAppCurrentUser();

  const { data, isLoading, refetch } = useQuery('balance', () =>
    instance.get(
      `/con-token/channels/mychannel/chaincodes/coin?wallet_address=${currentUser.wallet_address}&orgName=Org1&fcn=BalanceOf`
    )
  );

  return { balance: data?.data?.result, loading: isLoading, refetch };
}

export default useGetLocalConBalance;
