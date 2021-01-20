import { useQuery } from 'react-query';

import instance from '../axios/instance';
import getAuthHeader from '../helpers/getAuthHeader';

const getCurrentUser = () => instance.get('/admin/me');

function useAppCurrentUser() {
  const { data, isLoading, refetch } = useQuery('currentUser', getCurrentUser, {
    enabled: !!getAuthHeader(),
  });
  return { currentUser: data?.data, isLoading, refetch };
}

export default useAppCurrentUser;
