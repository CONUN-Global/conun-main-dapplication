import { useMutation } from 'react-query';

import instance from '../axios/instance';

function useSignup() {
  const { mutateAsync: signup, isLoading } = useMutation((signupData: any) =>
    instance.post('/users', signupData)
  );

  return { signup, loading: isLoading };
}

export default useSignup;
