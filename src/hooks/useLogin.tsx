import { useMutation } from 'react-query';

import instance from '../axios/instance';

function useLogin() {
  const { mutateAsync: login, isLoading } = useMutation((loginData: any) =>
    instance.post('/auth', loginData)
  );
  return { login, loading: isLoading };
}

export default useLogin;
