import { remote } from 'electron';

const authService = remote.require('./services/auth-service');

function useCurrentUser() {
  const currentUser = authService.getProfile();

  return { currentUser };
}

export default useCurrentUser;
