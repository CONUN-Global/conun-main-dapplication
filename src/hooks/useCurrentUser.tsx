import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

type CurrentUser = {
  name: string;
  email: string;
  picture: string;
} | null;

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  const getProfile = async () => {
    const user = await ipcRenderer.invoke('get-profile');
    setCurrentUser(user);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { currentUser };
}

export default useCurrentUser;
